package daos

import (
	"meli-backend/internal/domain"
)

// TopSellerDAO represents the top_sellers table
type TopSellerDAO struct {
	ID                    string  `gorm:"type:uuid;primaryKey;column:id"`
	ProductID             string  `gorm:"type:uuid;column:product_id;not null"`
	Rating                float64 `gorm:"type:numeric(5,2);column:rating;check:rating >= 1 AND rating <= 100"`
	NeedToKnowDescription string  `gorm:"column:need_to_know_description"`

	// Relationships
	Product *ProductDAO `gorm:"foreignKey:ProductID;references:ID"`
}

func (TopSellerDAO) TableName() string {
	return "top_sellers"
}

func (t *TopSellerDAO) ToDomain() *domain.TopSeller {
	return &domain.TopSeller{
		ID:                    t.ID,
		Rating:                t.Rating,
		NeedToKnowDescription: t.NeedToKnowDescription,
	}
}
