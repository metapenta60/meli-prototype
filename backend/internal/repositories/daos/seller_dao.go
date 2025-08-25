package daos

import "meli-backend/internal/domain"

// SellerDAO represents the sellers table
type SellerDAO struct {
	SellerID              string  `gorm:"type:uuid;primaryKey;column:seller_id"`
	Name                  string  `gorm:"column:name;not null"`
	Reputation            string  `gorm:"column:reputation"`
	NumberOfProducts      int     `gorm:"column:number_of_products;default:0"`
	NumberOfSales         int     `gorm:"column:number_of_sales;default:0"`
	NumberOfFollowers     int     `gorm:"column:number_of_followers;default:0"`
	CategoryDescription   string  `gorm:"column:category_description"`
	GeneralRating         float64 `gorm:"type:numeric(3,2);column:general_rating"`
	AttentionDescription  string  `gorm:"column:attention_description"`
	PuntualityDescription string  `gorm:"column:puntuality_description"`
	ImageID               *string `gorm:"type:uuid;column:image_id"`

	// Relationships
	Image *ImageDAO `gorm:"foreignKey:ImageID"`
}

func (SellerDAO) TableName() string {
	return "sellers"
}

func (s *SellerDAO) ToDomain() *domain.Seller {
	var image domain.Image
	if s.Image != nil {
		image = *s.Image.ToDomain()
	}

	return &domain.Seller{
		ID:                    s.SellerID,
		Name:                  s.Name,
		Reputation:            s.Reputation,
		NumberOfProducts:      s.NumberOfProducts,
		NumberOfSales:         s.NumberOfSales,
		NumberOfFollowers:     s.NumberOfFollowers,
		CategoryDescription:   s.CategoryDescription,
		GeneralRating:         s.GeneralRating,
		AttentionDescription:  s.AttentionDescription,
		PuntualityDescription: s.PuntualityDescription,
		Image:                 image,
	}
}
