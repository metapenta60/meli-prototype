package daos

import "meli-backend/internal/domain"

type FamilyDAO struct {
	FamilyID string `gorm:"type:uuid;primaryKey;column:family_id"`
	Title    string `gorm:"column:title;not null"`
}

func (FamilyDAO) TableName() string {
	return "families"
}

func (f *FamilyDAO) ToDomain() *domain.Family {
	return &domain.Family{
		ID:    f.FamilyID,
		Title: f.Title,
	}
}
