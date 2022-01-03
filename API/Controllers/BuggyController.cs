using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "this is a bad request - whoops" });
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("problem1", "first error");
            ModelState.AddModelError("problem2", "second error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new System.Exception("This is a server error - ruh oh");
        }
    }
}