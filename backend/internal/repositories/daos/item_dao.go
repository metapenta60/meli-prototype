package daos

import "meli-backend/internal/domain"

type ItemDAO struct {
	ItemID            string `gorm:"type:uuid;primaryKey;column:item_id"`
	UserProductID     string `gorm:"type:uuid;column:user_product_id;not null"`
	Title             string `gorm:"column:title;not null"`
	Description       string `gorm:"column:description"`
	AvailableQuantity int    `gorm:"column:available_quantity;default:0"`
	ProductStatus     string `gorm:"type:product_status_enum;column:product_status;not null"`
	PriceIDFK         string `gorm:"type:uuid;column:price_id_fk;not null"`

	UserProduct *UserProductDAO `gorm:"foreignKey:UserProductID"`
	Price       *PriceDAO       `gorm:"foreignKey:PriceIDFK"`
	ItemImages  ItemImagesDAO   `gorm:"foreignKey:ItemID"`
	Reviews     ReviewsDAO      `gorm:"foreignKey:ItemID"`
	Questions   QuestionsDAO    `gorm:"foreignKey:ItemID"`
}

func (ItemDAO) TableName() string {
	return "items"
}

func (i *ItemDAO) ToDomain() *domain.Item {
	var userProduct domain.UserProduct
	if i.UserProduct != nil {
		userProduct = *i.UserProduct.ToDomain()
	}

	var price domain.Price
	if i.Price != nil {
		price = *i.Price.ToDomain()
	}

	return &domain.Item{
		ID:                i.ItemID,
		Title:             i.Title,
		Description:       i.Description,
		AvailableQuantity: i.AvailableQuantity,
		ProductStatus:     i.ProductStatus,
		UserProduct:       userProduct,
		Price:             price,
		ItemImages:        i.ItemImages.ToDomain(),
		Reviews:           i.Reviews.ToDomain(),
		Questions:         i.Questions.ToDomain(),
	}
}
