using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BhpApp.Helpers
{
    public static class Errors
    {
        public static ModelStateDictionary AddErrorsToModelState(IdentityResult identityResult, ModelStateDictionary modelState, string userEmail)
        {
            foreach (var e in identityResult.Errors)
            {
                switch(e.Code)
                {
                    case "DuplicateEmail":
                    case "DuplicateUserName":
                        modelState.TryAddModelError("errors", "Email " + userEmail + " jest już wykorzystywany przez innego użytkownika. Aby utworzyć nowe konto prosimy użyć innego adresu email.");
                        break;
                    default:
                        modelState.TryAddModelError("errors", e.Description);
                        break;
                }                
            }

            return modelState;
        }

        public static ModelStateDictionary AddErrorToModelState(string code, string description, ModelStateDictionary modelState)
        {
            modelState.TryAddModelError(code, description);
            return modelState;
        }
    }
}
