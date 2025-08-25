package daos

import (
	"meli-backend/internal/domain"

	"github.com/samber/lo"
)

type ItemImagesDAO []ItemImageDAO

type ItemImageDAO struct {
	ID      string    `gorm:"type:uuid;primaryKey;column:id"`
	ItemID  string    `gorm:"type:uuid;column:item_id;not null"`
	ImageID string    `gorm:"type:uuid;column:image_id;not null"`
	Image   *ImageDAO `gorm:"foreignKey:ImageID"`
}

func (ItemImageDAO) TableName() string {
	return "item_images"
}

func (i *ItemImageDAO) ToDomain() *domain.ItemImage {
	return &domain.ItemImage{
		ID:               i.ID,
		URLSmallVersion:  i.Image.ToDomain().URLSmallVersion,
		URLMediumVersion: i.Image.ToDomain().URLMediumVersion,
		Alt:              i.Image.ToDomain().Alt,
	}
}

func (i ItemImagesDAO) ToDomain() []domain.ItemImage {
	return lo.Map(i, func(item ItemImageDAO, _ int) domain.ItemImage {
		return *item.ToDomain()
	})
}
