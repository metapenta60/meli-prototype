package domain

type Item struct {
	ID                string
	Title             string
	Description       string
	AvailableQuantity int
	ProductStatus     string
	UserProduct       UserProduct
	Price             Price
	ItemImages        []ItemImage
	Reviews           []Review
	Questions         []Question
}
