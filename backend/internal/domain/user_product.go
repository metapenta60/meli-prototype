package domain

type UserProduct struct {
	ID      string
	SKU     string
	Product Product
	Seller  Seller
}
