package daos

import (
	"encoding/json"
	"meli-backend/internal/domain"
)

type ProductDAO struct {
	ID             string          `gorm:"type:uuid;primaryKey;column:id"`
	Title          string          `gorm:"column:title;not null"`
	Model          string          `gorm:"column:model"`
	MainSpec       json.RawMessage `gorm:"type:jsonb;column:main_spec"`
	SecondarySpec  json.RawMessage `gorm:"type:jsonb;column:secondary_spec"`
	FamilyID       *string         `gorm:"type:uuid;column:family_id"`
	PaymentGroupID *string         `gorm:"type:uuid;column:payment_group_id"`

	// Relationships
	Family           *FamilyDAO             `gorm:"foreignKey:FamilyID;references:FamilyID"`
	PaymentGroup     *PaymentMethodGroupDAO `gorm:"foreignKey:PaymentGroupID;references:ID"`
	TopSeller        *TopSellerDAO          `gorm:"foreignKey:ProductID;references:ID"`
	AggregatedReview *AggregatedReviewDAO   `gorm:"foreignKey:ProductID;references:ID"`
}

func (ProductDAO) TableName() string {
	return "products"
}

func (p *ProductDAO) ToDomain() *domain.Product {
	var family domain.Family
	if p.Family != nil {
		family = *p.Family.ToDomain()
	}

	var paymentGroup domain.PaymentGroup
	if p.PaymentGroup != nil {
		paymentGroup = *p.PaymentGroup.ToDomain()
	}

	var topSeller *domain.TopSeller
	if p.TopSeller != nil {
		topSeller = p.TopSeller.ToDomain()
	}

	var aggregatedReview domain.AggregatedReview
	if p.AggregatedReview != nil {
		aggregatedReview = *p.AggregatedReview.ToDomain()
	}

	return &domain.Product{
		ID:               p.ID,
		Title:            p.Title,
		Model:            p.Model,
		MainSpec:         p.mainSpecToDomain(),
		SecondarySpec:    p.secondarySpecToDomain(),
		Family:           family,
		PaymentGroup:     paymentGroup,
		TopSeller:        topSeller,
		AggregatedReview: aggregatedReview,
	}
}

func (p *ProductDAO) mainSpecToDomain() []domain.MainSpecItem {
	var mainSpec []domain.MainSpecItem
	err := json.Unmarshal(p.MainSpec, &mainSpec)
	if err != nil {
		return nil
	}
	if mainSpec == nil {
		return []domain.MainSpecItem{}
	}
	return mainSpec
}

func (p *ProductDAO) secondarySpecToDomain() []domain.SecondarySpecItem {
	var secondarySpec []domain.SecondarySpecItem
	err := json.Unmarshal(p.SecondarySpec, &secondarySpec)
	if err != nil {
		return nil
	}
	if secondarySpec == nil {
		return []domain.SecondarySpecItem{}
	}
	return secondarySpec
}
