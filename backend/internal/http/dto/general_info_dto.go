package dto

type GeneralInfoDTO struct {
	Title       string  `json:"title"`
	Rating      float64 `json:"rating"`
	ReviewCount int     `json:"reviewCount"`
	Price       int64   `json:"price"`
	Status      string  `json:"status"`
	SoldCount   int     `json:"soldCount"`
}
