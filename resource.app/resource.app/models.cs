using System;

namespace resource.app.models
{
    public abstract class Resource
    {
        /// <summary>
        /// Defines this instance of a type.
        /// </summary>
        public Guid ID { get; set; }
        /// <summary>
        /// Defines the type of a type.
        /// </summary>
        public Guid ResourceType => this.GetType().GUID;
    }
    
    public class ResourceReference
    {
        public Guid ResourceType { get; set; }
        public Guid ID { get; set; }
    }
    public class ResourceReference<T> : ResourceReference where T:Resource {
        public ResourceReference(T target)
        {
            ResourceType = target.ResourceType;
            ID = target.ID;
        }
    }

    public class ResourceType : Resource
    {
        /// <summary>
        /// The type ID of the resource.
        /// </summary>
        public Guid TypeID { get; set; }
        /// <summary>
        /// The name of the targeted resource Type.
        /// </summary>
        public string Name { get; set; }
    }

    public class Tennant : Resource
    {
        public string Name { get; set; }
    }

    public class User : Resource
    {
        public Guid Tennant { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
    }

    public enum Gender { Male = 1, Female = 2, Undefined = 0 }

    public abstract class Shape : Resource
    {
        public string Color { get; set; }
    }

    public class Rectangle : Shape
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }

    public class Triangle : Shape
    {
        public int Heigth { get; set; }
        public int Width { get; set; }
        public int Angle { get; set; }
    }

    public class Circle : Shape
    {
        public int Radius { get; set; }
    }

    public class Drawing : Resource
    {
        public ImageComponent[] Shapes { get; set; }
    }

    public class ImageComponent //Note -> not a resource on its own
    {
        /// <summary>
        /// The actual shape that we should render.
        /// </summary>
        ResourceReference<Shape> Shape { get; set; }
        /// <summary>
        /// Offset of the shape in the X direction.
        /// </summary>
        public int OffsetX { get; set; }
        /// <summary>
        /// Offset of the center point in the Y direction.
        /// </summary>
        public int OffsetY { get; set; }
        /// <summary>
        /// Rotation in degrees around center point.
        /// </summary>
        public int Rotation { get; set; }
    }

    public class Tag : Resource
    {
        public string Name { get; set; }
    }

    public class SearchResult
    {
        /// <summary>
        /// Indicate this object contains the full results of the search.
        /// Can be used by the client to indicate a pager, or add extra's like ordering and grouping.
        /// </summary>
        public bool IsComplete { get; set; }
        /// <summary>
        /// The id of the result set. If non-zero, this id can be used to get the next part of the query.        /// </summary>
        public Guid SetId { get; set; }
        /// <summary>
        /// If 0+ indicates the total number of records in the result set.
        /// For example set if the complete set is 50 and we send only 10 records, so the client could choose to show a pager.
        /// </summary>
        public bool TotalSize { get; set; }

        //Optional -> add more meta data later ...

        /// <summary>
        /// The actual results. Note: searches can only return resources...
        /// </summary>
        public ResourceReference[] Results { get; set; }
    }
}
