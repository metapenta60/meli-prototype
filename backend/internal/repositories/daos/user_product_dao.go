package daos

import "meli-backend/internal/domain"

type UserProductDAO struct {
	ID        string `gorm:"type:uuid;primaryKey;column:id"`
	ProductID string `gorm:"type:uuid;column:product_id;not null"`
	SellerID  string `gorm:"type:uuid;column:seller_id;not null"`
	SKU       string `gorm:"column:sku"`

	Product *ProductDAO `gorm:"foreignKey:ProductID;references:ID"`
	Seller  *SellerDAO  `gorm:"foreignKey:SellerID;references:SellerID"`
}

func (UserProductDAO) TableName() string {
	return "user_products"
}

func (u *UserProductDAO) ToDomain() *domain.UserProduct {
	var product domain.Product
	if u.Product != nil {
		product = *u.Product.ToDomain()
	}

	var seller domain.Seller
	if u.Seller != nil {
		seller = *u.Seller.ToDomain()
	}

	return &domain.UserProduct{
		ID:      u.ID,
		SKU:     u.SKU,
		Product: product,
		Seller:  seller,
	}
}
