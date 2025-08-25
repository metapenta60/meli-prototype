package handlers

import (
	"meli-backend/internal/domain"
	"meli-backend/internal/http/dto"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type ItemService interface {
	GetEnriched(id string) (*domain.Item, error)
}

type ItemHandler struct {
	itemService ItemService
}

func NewItemHandler(itemService ItemService) *ItemHandler {
	return &ItemHandler{
		itemService: itemService,
	}
}

func (h *ItemHandler) GetByID(c *gin.Context) {
	itemID := c.Param("id")
	if itemID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Item ID is required",
		})
		return
	}

	item, err := h.itemService.GetEnriched(itemID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Item not found",
		})
		return
	}

	c.JSON(http.StatusOK, h.mapToResponse(item))
}

func (h *ItemHandler) mapToResponse(item *domain.Item) dto.ItemDTO {
	return dto.ItemDTO{
		RatingInfo: dto.RatingInfoDTO{
			OverallRating: item.UserProduct.Product.AggregatedReview.RatingValue,
			TotalRatings:  item.UserProduct.Product.AggregatedReview.RatingCount,
			Distribution:  h.calculateDistribution(item.Reviews),
			Reviews:       h.mapToReviews(item.Reviews),
		},
		Description: item.Description,
		Questions:   h.mapToQuestions(item.Questions),
		Seller: dto.SellerDTO{
			SellerName:            item.UserProduct.Seller.Name,
			SellerImageURL:        item.UserProduct.Seller.Image.URLSmallVersion,
			FollowersCount:        item.UserProduct.Seller.NumberOfFollowers,
			ProductsCount:         item.UserProduct.Seller.NumberOfProducts,
			Rating:                item.UserProduct.Seller.GeneralRating,
			SalesCount:            item.UserProduct.Seller.NumberOfSales,
			AttentionDescription:  item.UserProduct.Seller.AttentionDescription,
			PuntualityDescription: item.UserProduct.Seller.PuntualityDescription,
		},
		GeneralInfo: dto.GeneralInfoDTO{
			Title:       item.Title,
			Rating:      item.UserProduct.Product.AggregatedReview.RatingValue,
			ReviewCount: item.UserProduct.Product.AggregatedReview.RatingCount,
			Price:       int64(item.Price.Value),
			Status:      item.ProductStatus,
			SoldCount:   10,
		},
		Images: h.mapItemImages(item.ItemImages),
		CharacteristicsInfo: dto.CharacteristicsInfoDTO{
			MainCharacteristics:  h.mapToMainCharacteristics(item.UserProduct.Product.MainSpec),
			OtherCharacteristics: h.mapToOtherCharacteristics(item.UserProduct.Product.SecondarySpec),
		},
		PaymentInfo: dto.PaymentInfoDTO{
			Installments:   h.getInstallments(item.UserProduct.Product.PaymentGroup),
			PaymentMethods: h.mapToPaymentMethods(item.UserProduct.Product.PaymentGroup),
		},
	}
}

func (h *ItemHandler) mapToPaymentMethods(paymentGroup domain.PaymentGroup) []dto.PaymentMethodDTO {
	paymentMethods := paymentGroup.PaymentMethods
	mapTypeToPaymentMethod := h.groupMethodsByType(paymentMethods)

	dtos := []dto.PaymentMethodDTO{}
	for key, value := range mapTypeToPaymentMethod {
		dtos = append(dtos, dto.PaymentMethodDTO{
			Title:  key,
			Images: h.mapToPaymentMethodImage(value),
		})
	}

	return dtos
}

func (h *ItemHandler) mapToPaymentMethodImage(paymentMethods []domain.PaymentMethod) []string {
	return lo.Map(paymentMethods, func(paymentMethod domain.PaymentMethod, _ int) string {
		return paymentMethod.Image.URLSmallVersion
	})
}

func (h *ItemHandler) groupMethodsByType(paymentMethods []domain.PaymentMethod) map[string][]domain.PaymentMethod {
	mapTypeToPaymentMethod := map[string][]domain.PaymentMethod{}

	for _, paymentMethod := range paymentMethods {
		mapTypeToPaymentMethod[paymentMethod.Type] = append(mapTypeToPaymentMethod[paymentMethod.Type], paymentMethod)
	}

	return mapTypeToPaymentMethod
}

func (h *ItemHandler) getInstallments(paymentGroup domain.PaymentGroup) int {
	maxInstallments := 0
	for _, paymentMethod := range paymentGroup.PaymentMethods {
		if paymentMethod.NumberOfInstallments > maxInstallments {
			maxInstallments = paymentMethod.NumberOfInstallments
		}
	}
	return maxInstallments
}

func (h *ItemHandler) mapToOtherCharacteristics(characteristics []domain.SecondarySpecItem) []dto.CharacteristicsGroupDTO {

	return lo.Map(characteristics, func(characteristic domain.SecondarySpecItem, _ int) dto.CharacteristicsGroupDTO {
		return dto.CharacteristicsGroupDTO{
			Title: characteristic.Item,
			Characteristics: lo.Map(characteristic.Values, func(value domain.SecondarySpecValue, _ int) dto.CharacteristicItemDTO {
				return dto.CharacteristicItemDTO{
					Title: value.Item,
					Value: value.Value,
				}
			}),
		}
	})
}

func (h *ItemHandler) mapToMainCharacteristics(characteristics []domain.MainSpecItem) []dto.MainCharacteristicDTO {

	return lo.Map(characteristics, func(characteristic domain.MainSpecItem, _ int) dto.MainCharacteristicDTO {
		return dto.MainCharacteristicDTO{
			Icon:    characteristic.ImageIconURL,
			Title:   characteristic.Item,
			Content: characteristic.Value,
		}
	})
}

func (h *ItemHandler) mapItemImages(images []domain.ItemImage) []dto.ImageDTO {
	return lo.Map(images, func(image domain.ItemImage, _ int) dto.ImageDTO {
		return h.mapToImageDTO(image)
	})
}

func (h *ItemHandler) mapToImageDTO(image domain.ItemImage) dto.ImageDTO {
	return dto.ImageDTO{
		URLSmallVersion:  image.URLSmallVersion,
		URLMediumVersion: image.URLMediumVersion,
		Alt:              image.Alt,
	}
}

func (h *ItemHandler) mapToQuestions(questions []domain.Question) []dto.QuestionDTO {
	return lo.Map(questions, func(question domain.Question, _ int) dto.QuestionDTO {
		return h.mapToQuestionDTO(question)
	})
}

func (h *ItemHandler) mapToQuestionDTO(question domain.Question) dto.QuestionDTO {
	return dto.QuestionDTO{
		Question: question.Question,
		Answer:   question.Answer,
		Date:     question.CreatedAt.Format("02 Jan 2006"),
	}
}

func (h *ItemHandler) mapToReviews(reviews []domain.Review) []dto.ReviewDTO {
	return lo.Map(reviews, func(review domain.Review, _ int) dto.ReviewDTO {
		return h.mapToReviewDTO(review)
	})
}

func (h *ItemHandler) mapToReviewDTO(review domain.Review) dto.ReviewDTO {
	return dto.ReviewDTO{
		Rating:  review.Rating,
		Comment: review.Content,
		Date:    review.CreatedAt.Format("02 Jan 2006"),
	}
}

func (h *ItemHandler) calculateDistribution(reviews []domain.Review) []dto.RatingBucketDTO {
	counts := make(map[int]int)
	for _, review := range reviews {
		counts[review.Rating]++
	}

	sum := 0
	for _, count := range counts {
		sum += count
	}

	distribution := []dto.RatingBucketDTO{}

	for rating, count := range counts {
		percentage := (count / sum) * 100
		distribution = append(distribution, dto.RatingBucketDTO{
			Rating:     rating,
			Count:      count,
			Percentage: percentage,
		})
	}
	return distribution
}
