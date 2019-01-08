namespace BhpApp.Helpers
{
    public static class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Rol = "rol", Id = "id";
            }

            public static class JwtClaims
            {
                public const string StudentAccess = "student_access";
                public const string AdminAcess = "admin_access";
            }
        }
    }
}
