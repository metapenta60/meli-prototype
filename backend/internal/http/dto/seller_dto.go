package dto

type SellerDTO struct {
	SellerName            string  `json:"sellerName"`
	SellerImageURL        string  `json:"sellerImageUrl"`
	FollowersCount        int     `json:"followersCount"`
	ProductsCount         int     `json:"productsCount"`
	Rating                float64 `json:"rating"`
	SalesCount            int     `json:"salesCount"`
	AttentionDescription  string  `json:"attentionDescription"`
	PuntualityDescription string  `json:"puntualityDescription"`
}
