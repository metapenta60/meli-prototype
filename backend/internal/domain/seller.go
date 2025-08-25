package domain

type Seller struct {
	ID                    string
	Name                  string
	Reputation            string
	NumberOfProducts      int
	NumberOfSales         int
	NumberOfFollowers     int
	CategoryDescription   string
	GeneralRating         float64
	AttentionDescription  string
	PuntualityDescription string
	Image                 Image
}
