namespace CrmCalculations
{
  using System;
  using CrmEarlyBound;
  using Microsoft.Xrm.Sdk;

  /// <summary>
  /// This class contains all the calculations for the ContactPostCreate, ContactPreCreate and ContactPreUpdate.
  /// </summary>
  public class Calculations
  {
    /// <summary>
    /// This method calculates the age of a client based on their birthdate and current date.
    /// </summary>
    /// <param name="contact">This is the current image of a contact</param>
    /// <param name="preContact">This is the pre image of a contact</param>
    /// <returns>returns age in interger</returns>
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

    /// <summary>
    /// This method calculates the estimated return a client will recieve based on their investment period, intial investment period and interest rate.
    /// </summary>
    /// <param name="contact">This is the current image of a contact</param>
    /// <param name="preContact">This is the pre image of a contact</param>
    /// <returns>Returns a decimal value of estimated return</returns> 
    public decimal CalculateEstReturn(Contact contact, Contact preContact)
    {
      int? investmentPeriod = contact.di_InvestmentPeriod ?? preContact.di_InvestmentPeriod;
      decimal? initialInvestment = contact.di_IntialInvesmentFinal ?? preContact.di_IntialInvesmentFinal;
      decimal? interestRate = contact.di_interest_rate / 100 ?? preContact.di_interest_rate / 100;
      decimal? rate = interestRate / 100;
      return (initialInvestment * (1 + (interestRate * investmentPeriod))).GetValueOrDefault(0);
    }

    /// <summary>
    /// This method calculates the maturity date of an investment based on the joining date and investment period.
    /// </summary>
    /// <param name="contact">This is the current image of a contact</param>
    /// <param name="preContact">This is the pre image of a contact</param>
    /// <returns>Returns a Datetime type which is the maturity date</returns>
    public DateTime CalculateMaturityDate(Contact contact, Contact preContact)
    {
      DateTime? joining = contact.di_joining_date;
      DateTime realJoining = joining.GetValueOrDefault(DateTime.Now);
      return realJoining.AddMonths(contact.di_InvestmentPeriod.GetValueOrDefault(0));
    }

    /// <summary>
    /// This function changes the status reason from active to in-force
    /// </summary>
    /// <param name="contact">This is the current image of a contact</param>
    public void AutoSetReason(Contact contact)
    {
      contact.StatusCode = new OptionSetValue((int)Contact_StatusCode.InForce);
    }
  }
}