using System;

namespace EntityLib.Shared
{
    public abstract class BaseEntity<T>
    {
        public T Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
