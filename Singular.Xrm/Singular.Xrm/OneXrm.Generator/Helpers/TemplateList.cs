namespace OneXrm.Generator.Helpers
{
  using System.IO;

  /// <summary>
  /// The TemplateList class
  /// </summary>
  public sealed class TemplateList
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="TemplateList"/> class.
    /// </summary>
    public TemplateList()
    {
      this.Entity = File.ReadAllText(@"..\..\Templates\Entity.txt");
      this.MetadataAttribute = File.ReadAllText(@"..\..\Templates\MetadataAttribute.txt");
      this.OptionSetEnum = File.ReadAllText(@"..\..\Templates\OptionSetEnum.txt");

      this.BigIntAttribute = File.ReadAllText(@"..\..\Templates\Attributes\BigInt.txt");
      this.BooleanAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Boolean.txt");
      this.CustomerAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Customer.txt");
      this.DateTimeAttribute = File.ReadAllText(@"..\..\Templates\Attributes\DateTime.txt");
      this.DecimalAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Decimal.txt");
      this.DoubleAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Double.txt");
      this.IntegerAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Integer.txt");
      this.LookupAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Lookup.txt");
      this.MemoAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Memo.txt");
      this.MoneyAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Money.txt");
      this.MultiSelectPicklistAttribute = File.ReadAllText(@"..\..\Templates\Attributes\MultiSelectPicklist.txt");
      this.OwnerAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Owner.txt");
      this.PartyListAttribute = File.ReadAllText(@"..\..\Templates\Attributes\PartyList.txt");
      this.PicklistAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Picklist.txt");
      this.StateAttribute = File.ReadAllText(@"..\..\Templates\Attributes\State.txt");
      this.StatusAttribute = File.ReadAllText(@"..\..\Templates\Attributes\Status.txt");
      this.StringAttribute = File.ReadAllText(@"..\..\Templates\Attributes\String.txt");
    }

    /// <summary>
    /// Gets the Entity template
    /// </summary>
    public string Entity { get; private set; }

    /// <summary>
    /// Gets the MetadataAttribute template
    /// </summary>
    public string MetadataAttribute { get; private set; }

    /// <summary>
    /// Gets the OptionSetEnum template
    /// </summary>
    public string OptionSetEnum { get; private set; }

    /// <summary>
    /// Gets the BigIntAttribute template
    /// </summary>
    public string BigIntAttribute { get; private set; }

    /// <summary>
    /// Gets the BooleanAttribute template
    /// </summary>
    public string BooleanAttribute { get; private set; }

    /// <summary>
    /// Gets the CustomerAttribute template
    /// </summary>
    public string CustomerAttribute { get; private set; }

    /// <summary>
    /// Gets the DateTimeAttribute template
    /// </summary>
    public string DateTimeAttribute { get; private set; }

    /// <summary>
    /// Gets the DecimalAttribute template
    /// </summary>
    public string DecimalAttribute { get; private set; }

    /// <summary>
    /// Gets the DoubleAttribute template
    /// </summary>
    public string DoubleAttribute { get; private set; }

    /// <summary>
    /// Gets the IntegerAttribute template
    /// </summary>
    public string IntegerAttribute { get; private set; }

    /// <summary>
    /// Gets the entityLookupAttribute template
    /// </summary>
    public string LookupAttribute { get; private set; }

    /// <summary>
    /// Gets the MemoAttribute template
    /// </summary>
    public string MemoAttribute { get; private set; }

    /// <summary>
    /// Gets the MoneyAttribute template
    /// </summary>
    public string MoneyAttribute { get; private set; }

    /// <summary>
    /// Gets the MultiSelectPicklistAttribute template
    /// </summary>
    public string MultiSelectPicklistAttribute { get; private set; }

    /// <summary>
    /// Gets the OwnerAttribute template
    /// </summary>
    public string OwnerAttribute { get; private set; }

    /// <summary>
    /// Gets the PartyListAttribute template
    /// </summary>
    public string PartyListAttribute { get; private set; }

    /// <summary>
    /// Gets the PicklistAttribute template
    /// </summary>
    public string PicklistAttribute { get; private set; }

    /// <summary>
    /// Gets the StateAttribute template
    /// </summary>
    public string StateAttribute { get; private set; }

    /// <summary>
    /// Gets the StatusAttribute template
    /// </summary>
    public string StatusAttribute { get; private set; }

    /// <summary>
    /// Gets the StringAttribute template
    /// </summary>
    public string StringAttribute { get; private set; }
  }
}
