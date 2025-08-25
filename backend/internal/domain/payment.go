package domain

type PaymentGroup struct {
	ID             string
	PaymentMethods []PaymentMethod
}

type PaymentMethod struct {
	ID                     string
	NumberOfInstallments   int
	InterestRatePercentage float64
	Type                   string
	Image                  Image
}
