namespace Singular.Xrm.Managers
{
  using System;
  using System.Linq;
  using Microsoft.Xrm.Sdk;

  /// <summary>
  /// The EntityManager class
  /// </summary>
  public sealed class EntityManager
  {
    /// <summary>
    /// Prevents a default instance of the <see cref="EntityManager"/> class from being created.
    /// </summary>
    private EntityManager()
    {
    }

    /// <summary>
    /// Checks whether a property of an entity has a value
    /// </summary>
    /// <param name="entity">The entity</param>
    /// <param name="attribute">The attribute</param>
    /// <returns>Whether a property of an entity has a value</returns>
    public static bool HasValue(Entity entity, string attribute)
    {
      if (entity == null)
      {
        return false;
      }
      else
      {
        if (entity.Attributes.Contains(attribute))
        {
          if (entity.Attributes[attribute] == null)
          {
            return false;
          }
          else
          {
            return !string.IsNullOrEmpty(entity.Attributes[attribute].ToString());
          }
        }
        else
        {
          return false;
        }
      }
    }

    /// <summary>
    /// Returns a value indicating whether value of any of the supplied attributes have changed between two entity instances
    /// </summary>
    /// <param name="preEntity">The pre entity instance</param>
    /// <param name="postEntity">The post entity instance</param>
    /// <param name="attributes">The attributes to check</param>
    /// <returns>A value indicating whether value of any of the supplied attributes have changed between two entity instances</returns>
    public static bool HaveValuesChanged(Entity preEntity, Entity postEntity, params string[] attributes)
    {
      foreach (string attribute in attributes)
      {
        if (HasValueChanged(preEntity, postEntity, attribute))
        {
          return true;
        }
      }
      return false;
    }

    /// <summary>
    /// Get the value of the specified entity attribute
    /// </summary>
    /// <param name="entity">The entity</param>
    /// <param name="attribute">The attribute</param>
    /// <param name="replace">The value to return if the specified attribute is not present on the entity</param>
    /// <returns>The value of the specified entity attribute</returns>
    public static object GetValue(Entity entity, string attribute, object replace = null)
    {
      if (EntityManager.HasValue(entity, attribute))
      {
        return entity[attribute];
      }
      else
      {
        return replace;
      }
    }

    /// <summary>
    /// Returns a value indicating whether the value of an attribute has changed between two entity instances
    /// </summary>
    /// <param name="preEntity">The pre entity instance</param>
    /// <param name="postEntity">The post entity instance</param>
    /// <param name="attribute">The attribute to check</param>
    /// <returns>A value indicating whether the value of an attribute has changed between two entity instances</returns>
    private static bool HasValueChanged(Entity preEntity, Entity postEntity, string attribute)
    {
      if (postEntity.Contains(attribute))
      {
        if (EntityManager.HasValue(postEntity, attribute))
        {
          if (EntityManager.HasValue(preEntity, attribute))
          {
            if (postEntity[attribute].GetType() == typeof(EntityReference))
            {
              return ((EntityReference)preEntity[attribute]).Id != ((EntityReference)postEntity[attribute]).Id;
            }
            else if (postEntity[attribute].GetType() == typeof(Money))
            {
              return ((Money)preEntity[attribute]).Value != ((Money)postEntity[attribute]).Value;
            }
            else if (postEntity[attribute].GetType() == typeof(OptionSetValue))
            {
              return ((OptionSetValue)preEntity[attribute]).Value != ((OptionSetValue)postEntity[attribute]).Value;
            }
            else if (postEntity[attribute].GetType() == typeof(OptionSetValueCollection))
            {
              OptionSetValueCollection optionSetValuesPre = (OptionSetValueCollection)preEntity[attribute];
              OptionSetValueCollection optionSetValuesPost = (OptionSetValueCollection)postEntity[attribute];

              return !OptionSetValueCollectionManager.GetValues(optionSetValuesPre).SequenceEqual(OptionSetValueCollectionManager.GetValues(optionSetValuesPost));
            }
            else if (postEntity[attribute].GetType() == typeof(DateTime))
            {
              return !((DateTime)preEntity[attribute]).Equals(postEntity[attribute]);
            }
            else if (postEntity[attribute].GetType() == typeof(EntityCollection))
            {
              EntityCollection entityCollectionPre = (EntityCollection)preEntity[attribute];
              EntityCollection entityCollectionPost = (EntityCollection)postEntity[attribute];
              if (entityCollectionPre.Entities.Count != entityCollectionPost.Entities.Count)
              {
                return true;
              }
              else
              {
                for (int i = 0; i < entityCollectionPre.Entities.Count; i++)
                {
                  Entity activityPartyPre = entityCollectionPre.Entities[i];
                  Entity activityPartyPost = entityCollectionPost.Entities[i];

                  if (EntityManager.HasValue(activityPartyPre, "partyid"))
                  {
                    if (!EntityManager.HasValue(activityPartyPost, "partyid") || ((EntityReference)activityPartyPre["partyid"]).Id != ((EntityReference)activityPartyPost["partyid"]).Id)
                    {
                      return true;
                    }
                  }
                  else
                  {
                    if (EntityManager.HasValue(activityPartyPost, "partyid") || (string)activityPartyPre["addressused"] != (string)activityPartyPost["addressused"])
                    {
                      return true;
                    }
                  }
                }
              }
            }
            else
            {
              return preEntity[attribute].ToString() != postEntity[attribute].ToString();
            }
          }
          else
          {
            return true;
          }
        }
        else
        {
          return HasValue(preEntity, attribute);
        }
      }

      return false;
    }
  }
}
