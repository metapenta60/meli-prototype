package daos

import "meli-backend/internal/domain"

// Image represents the images table
type ImageDAO struct {
	ID               string `gorm:"type:uuid;primaryKey;column:id"`
	URLSmallVersion  string `gorm:"column:url_small_version"`
	URLMediumVersion string `gorm:"column:url_medium_version"`
	Alt              string `gorm:"column:alt"`
}

func (ImageDAO) TableName() string {
	return "images"
}

func (i *ImageDAO) ToDomain() *domain.Image {
	return &domain.Image{
		ID:               i.ID,
		URLSmallVersion:  i.URLSmallVersion,
		URLMediumVersion: i.URLMediumVersion,
		Alt:              i.Alt,
	}
}
