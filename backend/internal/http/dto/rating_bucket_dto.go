package dto

type RatingBucketDTO struct {
	Rating     int `json:"rating"`
	Count      int `json:"count"`
	Percentage int `json:"percentage"`
}
