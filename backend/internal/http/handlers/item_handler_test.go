package handlers

import (
	"meli-backend/internal/domain"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockItemService struct {
	mock.Mock
}

func (m *MockItemService) GetEnriched(id string) (*domain.Item, error) {
	args := m.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.Item), args.Error(1)
}

func TestNewItemHandler(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	assert.NotNil(t, handler)
	assert.Equal(t, mockService, handler.itemService)
}

func TestItemHandler_GetByID_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	expectedItem := createMockItem()

	mockService.On("GetEnriched", "test-item-id").Return(expectedItem, nil)

	handler := NewItemHandler(mockService)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{{Key: "id", Value: "test-item-id"}}

	handler.GetByID(c)

	assert.Equal(t, http.StatusOK, w.Code)
	mockService.AssertExpectations(t)
}

func TestItemHandler_GetByID_EmptyID(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{{Key: "id", Value: ""}}

	handler.GetByID(c)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestItemHandler_GetByID_ServiceError(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	mockService.On("GetEnriched", "invalid-id").Return(nil, assert.AnError)

	handler := NewItemHandler(mockService)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{{Key: "id", Value: "invalid-id"}}

	handler.GetByID(c)

	assert.Equal(t, http.StatusNotFound, w.Code)
	mockService.AssertExpectations(t)
}

func TestItemHandler_MapToResponse(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	item := createMockItem()
	result := handler.mapToResponse(item)

	assert.NotNil(t, result)
	assert.Equal(t, "Test Item", result.GeneralInfo.Title)
	assert.Equal(t, "Test Description", result.Description)
	assert.Equal(t, "Test Seller", result.Seller.SellerName)
	assert.Equal(t, int64(9999), result.GeneralInfo.Price)
}

func TestItemHandler_MapToPaymentMethods(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	paymentGroup := domain.PaymentGroup{
		PaymentMethods: []domain.PaymentMethod{
			{Type: "credit_card", NumberOfInstallments: 12},
			{Type: "debit_card", NumberOfInstallments: 1},
		},
	}

	result := handler.mapToPaymentMethods(paymentGroup)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
}

func TestItemHandler_MapToPaymentMethods_Empty(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	paymentGroup := domain.PaymentGroup{
		PaymentMethods: []domain.PaymentMethod{},
	}

	result := handler.mapToPaymentMethods(paymentGroup)

	assert.NotNil(t, result)
	assert.Len(t, result, 0)
}

func TestItemHandler_GroupMethodsByType(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	paymentMethods := []domain.PaymentMethod{
		{Type: "credit_card", NumberOfInstallments: 12},
		{Type: "credit_card", NumberOfInstallments: 6},
		{Type: "debit_card", NumberOfInstallments: 1},
	}

	result := handler.groupMethodsByType(paymentMethods)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Len(t, result["credit_card"], 2)
	assert.Len(t, result["debit_card"], 1)
}

func TestItemHandler_GetInstallments(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	paymentGroup := domain.PaymentGroup{
		PaymentMethods: []domain.PaymentMethod{
			{NumberOfInstallments: 12},
			{NumberOfInstallments: 6},
			{NumberOfInstallments: 1},
		},
	}

	result := handler.getInstallments(paymentGroup)

	assert.Equal(t, 12, result) // Should return the maximum number of installments
}

func TestItemHandler_MapToOtherCharacteristics(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	specs := []domain.SecondarySpecItem{
		{Item: "Color", Values: []domain.SecondarySpecValue{{Value: "Red"}}},
		{Item: "Size", Values: []domain.SecondarySpecValue{{Value: "Large"}}},
	}

	result := handler.mapToOtherCharacteristics(specs)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
}

func TestItemHandler_MapToMainCharacteristics(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	specs := []domain.MainSpecItem{
		{Item: "Brand", Value: "Nike", ImageIconURL: "brand-icon.png"},
		{Item: "Model", Value: "Air Max", ImageIconURL: "model-icon.png"},
	}

	result := handler.mapToMainCharacteristics(specs)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
}

func TestItemHandler_MapItemImages(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	images := []domain.ItemImage{
		{URLSmallVersion: "small1.jpg", URLMediumVersion: "medium1.jpg", Alt: "Image 1"},
		{URLSmallVersion: "small2.jpg", URLMediumVersion: "medium2.jpg", Alt: "Image 2"},
	}

	result := handler.mapItemImages(images)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, "small1.jpg", result[0].URLSmallVersion)
	assert.Equal(t, "medium2.jpg", result[1].URLMediumVersion)
}

func TestItemHandler_MapToImageDTO(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	image := domain.ItemImage{
		URLSmallVersion:  "small.jpg",
		URLMediumVersion: "medium.jpg",
		Alt:              "Test Image",
	}

	result := handler.mapToImageDTO(image)

	assert.NotNil(t, result)
	assert.Equal(t, "small.jpg", result.URLSmallVersion)
	assert.Equal(t, "medium.jpg", result.URLMediumVersion)
	assert.Equal(t, "Test Image", result.Alt)
}

func TestItemHandler_MapToQuestions(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	questions := []domain.Question{
		{Question: "What is the warranty?", Answer: "2 years"},
		{Question: "Is it available?", Answer: "Yes"},
	}

	result := handler.mapToQuestions(questions)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, "What is the warranty?", result[0].Question)
	assert.Equal(t, "2 years", result[0].Answer)
}

func TestItemHandler_MapToQuestionDTO(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	question := domain.Question{
		Question: "Test question?",
		Answer:   "Test answer.",
	}

	result := handler.mapToQuestionDTO(question)

	assert.NotNil(t, result)
	assert.Equal(t, "Test question?", result.Question)
	assert.Equal(t, "Test answer.", result.Answer)
}

func TestItemHandler_MapToReviews(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	reviews := []domain.Review{
		{Rating: 5, Content: "Great product!"},
		{Rating: 4, Content: "Good product."},
	}

	result := handler.mapToReviews(reviews)

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, 5, result[0].Rating)
}

func TestItemHandler_MapToReviewDTO(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	review := domain.Review{
		Rating:  4,
		Content: "Test review content",
	}

	result := handler.mapToReviewDTO(review)

	assert.NotNil(t, result)
	assert.Equal(t, 4, result.Rating)
}

func TestItemHandler_CalculateDistribution(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	reviews := []domain.Review{
		{Rating: 5}, {Rating: 5}, {Rating: 5},
		{Rating: 4}, {Rating: 4},
		{Rating: 3},
		{Rating: 2},
		{Rating: 1},
	}

	result := handler.calculateDistribution(reviews)

	assert.NotNil(t, result)
	assert.Len(t, result, 5)

}

func TestItemHandler_CalculateDistribution_Empty(t *testing.T) {
	mockService := &MockItemService{}
	handler := NewItemHandler(mockService)

	reviews := []domain.Review{}

	result := handler.calculateDistribution(reviews)

	assert.NotNil(t, result)
	assert.Len(t, result, 0)
}

// Helper function to create a mock item for testing
func createMockItem() *domain.Item {
	return &domain.Item{
		ID:            "test-item-id",
		Title:         "Test Item",
		Description:   "Test Description",
		ProductStatus: "active",
		UserProduct: domain.UserProduct{
			Product: domain.Product{
				AggregatedReview: domain.AggregatedReview{
					RatingValue: 4.5,
					RatingCount: 100,
				},
				PaymentGroup: domain.PaymentGroup{
					PaymentMethods: []domain.PaymentMethod{
						{Type: "credit_card", NumberOfInstallments: 12},
					},
				},
				MainSpec: []domain.MainSpecItem{
					{Item: "Brand", Value: "Test Brand", ImageIconURL: "brand-icon.png"},
				},
				SecondarySpec: []domain.SecondarySpecItem{
					{Item: "Color", Values: []domain.SecondarySpecValue{{Value: "Blue"}}},
				},
			},
			Seller: domain.Seller{
				Name:                  "Test Seller",
				NumberOfFollowers:     1000,
				NumberOfProducts:      50,
				GeneralRating:         4.8,
				NumberOfSales:         200,
				AttentionDescription:  "Fast response",
				PuntualityDescription: "Always on time",
				Image: domain.Image{
					URLSmallVersion: "seller-small.jpg",
				},
			},
		},
		Price: domain.Price{
			Value: 9999,
		},
		ItemImages: []domain.ItemImage{
			{URLSmallVersion: "small1.jpg", URLMediumVersion: "medium1.jpg", Alt: "Image 1"},
		},
		Reviews: []domain.Review{
			{Rating: 5, Content: "Great product!"},
		},
		Questions: []domain.Question{
			{Question: "What is the warranty?", Answer: "2 years"},
		},
	}
}
