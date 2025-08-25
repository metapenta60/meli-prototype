package dto

type RatingInfoDTO struct {
	OverallRating float64           `json:"overallRating"`
	TotalRatings  int               `json:"totalRatings"`
	Distribution  []RatingBucketDTO `json:"distribution"`
	Reviews       []ReviewDTO       `json:"reviews"`
}
