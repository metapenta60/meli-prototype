package daos

import (
	"github.com/samber/lo"

	"meli-backend/internal/domain"
	"time"
)

type ReviewsDAO []ReviewDAO

type ReviewDAO struct {
	ID        string    `gorm:"type:uuid;primaryKey;column:id"`
	ProductID string    `gorm:"type:uuid;column:product_id;not null"`
	SellerID  string    `gorm:"type:uuid;column:seller_id;not null"`
	ItemID    *string   `gorm:"type:uuid;column:item_id"`
	Rating    int       `gorm:"column:rating;check:rating >= 1 AND rating <= 5"`
	Content   string    `gorm:"column:content"`
	CreatedAt time.Time `gorm:"column:created_at;default:now()"`
}

func (ReviewDAO) TableName() string {
	return "reviews"
}

func (r *ReviewDAO) ToDomain() *domain.Review {
	return &domain.Review{
		ID:        r.ID,
		Rating:    r.Rating,
		Content:   r.Content,
		CreatedAt: r.CreatedAt,
	}
}

func (r ReviewsDAO) ToDomain() []domain.Review {
	return lo.Map(r, func(item ReviewDAO, _ int) domain.Review {
		return *item.ToDomain()
	})
}
