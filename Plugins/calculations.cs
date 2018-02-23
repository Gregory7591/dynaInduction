
using System;
using CrmEarlyBound;

namespace CrmCalculations
{
  public class Calculations
  {
    public int CalculateAge(Contact contact, Contact preContact)
    {
      DateTime dateCurrent = DateTime.Now;
      DateTime? dateofBirth = contact.BirthDate ?? preContact.BirthDate;
      DateTime realdateofBirth = dateofBirth.GetValueOrDefault(DateTime.Now);
      

      int dateDiff = dateCurrent.Month - realdateofBirth.Month;

      if (dateDiff > -1)
      {
        return dateCurrent.Year - realdateofBirth.Year;
      }
      else
      {
        return dateCurrent.Year - realdateofBirth.Year - 1;
      }  
    }

    public decimal CalculateEstReturn(Contact contact, Contact preContact)
    {

      int? investmentPeriod = contact.di_InvestmentPeriod ?? preContact.di_InvestmentPeriod;
      decimal? initialInvestment = contact.di_IntialInvesmentFinal ?? preContact.di_IntialInvesmentFinal;
      decimal? interestRate = contact.di_interest_rate / 100 ?? preContact.di_interest_rate / 100;
      decimal? rate = interestRate / 100;
      return (initialInvestment * (1 + (interestRate * investmentPeriod))).GetValueOrDefault(0); 
      
    }

    public DateTime CalculateMaturityDate(Contact contact, Contact preContact)
    {
      contact.di_joining_date = DateTime.Now;
      return DateTime.Now.Date.AddMonths(contact.di_InvestmentPeriod.GetValueOrDefault(0));
    }

  }
}