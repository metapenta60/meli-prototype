// internal/http/dto/item_dto.go
package dto

type ItemDTO struct {
	RatingInfo          RatingInfoDTO          `json:"ratingInfo"`
	RatingDistribution  []RatingBucketDTO      `json:"ratingDistribution"`
	Description         string                 `json:"description"`
	Questions           []QuestionDTO          `json:"questions"`
	Seller              SellerDTO              `json:"seller"`
	GeneralInfo         GeneralInfoDTO         `json:"generalInfo"`
	Images              []ImageDTO             `json:"images"`
	CharacteristicsInfo CharacteristicsInfoDTO `json:"characteristicsInfo"`
	PaymentInfo         PaymentInfoDTO         `json:"paymentInfo"`
}
