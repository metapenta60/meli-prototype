package domain

type Product struct {
	ID               string
	Title            string
	Model            string
	MainSpec         []MainSpecItem
	SecondarySpec    []SecondarySpecItem
	Family           Family
	PaymentGroup     PaymentGroup
	TopSeller        *TopSeller
	AggregatedReview AggregatedReview
}
