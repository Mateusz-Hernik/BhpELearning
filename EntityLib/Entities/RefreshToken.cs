using EntityLib.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace EntityLib.Entities
{
    public class RefreshToken : BaseEntity<int>
    {
        public string Token { get; private set; }
        public DateTime Expires { get; private set; }
        public int UserId { get; private set; }
        public bool Active => DateTime.UtcNow <= Expires;
        public string RemoteIpAddress { get; private set; }
    }
}
