using System;

namespace EntityLib.Shared
{
    public abstract class BaseEntityWithoutId
    {
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
