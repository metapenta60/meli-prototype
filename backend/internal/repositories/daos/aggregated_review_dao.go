package daos

import "meli-backend/internal/domain"

// AggregatedReviewDAO represents the aggregated_reviews table
type AggregatedReviewDAO struct {
	ID          string  `gorm:"type:uuid;primaryKey;column:id"`
	ProductID   string  `gorm:"type:uuid;column:product_id;not null;uniqueIndex"`
	RatingValue float64 `gorm:"type:numeric(3,2);column:rating_value"`
	RatingCount int     `gorm:"column:rating_count;default:0"`
}

func (AggregatedReviewDAO) TableName() string {
	return "aggregated_reviews"
}

func (a *AggregatedReviewDAO) ToDomain() *domain.AggregatedReview {
	return &domain.AggregatedReview{
		ID:          a.ID,
		RatingValue: a.RatingValue,
		RatingCount: a.RatingCount,
	}
}
