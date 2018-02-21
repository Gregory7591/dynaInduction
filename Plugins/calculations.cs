
using System;
using CrmEarlyBound;

namespace CrmCalculations
{
  public class Calculations
  {
    public int CalculateAge(Contact contact, Contact preContact)
    {
      DateTime dateCurrent = DateTime.Now.Date;
      DateTime? dateofBirth = contact.di_dateofBirth ?? preContact.di_dateofBirth;
      DateTime realDateofBirth = (DateTime)dateofBirth;

      int dateDiff = dateCurrent.Month - realDateofBirth.Month;

      if (dateDiff > -1)
      {
        return dateCurrent.Year - realDateofBirth.Year;
      }
      else
      {
        return dateCurrent.Year - realDateofBirth.Year - 1;
      }

    }
    public decimal CalculateEstReturn(Contact contact, Contact preContact)
    {

      int? investmentPeriod = contact.di_InvestmentPeriod ?? preContact.di_InvestmentPeriod;
      decimal? initialInvestment = contact.di_IntialInvesmentFinal ?? preContact.di_IntialInvesmentFinal;
      decimal? interestRate = contact.di_interest_rate / 100 ?? preContact.di_interest_rate / 100;
      decimal? rate = interestRate / 100;
      return (decimal)(initialInvestment * (1 + (interestRate * investmentPeriod)));
    }

    public DateTime CalculateMaturityDate(Contact contact, Contact preContact)
    {
      contact.di_joining_date = DateTime.Now.Date;
      return DateTime.Now.Date.AddMonths((int)(contact.di_InvestmentPeriod)); ;
    }

  }
}