using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using resource.app.models;

namespace website.Controllers
{
    public class ResourceController
    {
        [HttpGet]
        public ActionResult Record(Guid type, Guid id)
        {
            return new NotFoundResult();
        }

        [HttpGet]
        public ActionResult Records(Guid type, IEnumerable<Guid> ids)
        {
            return new NotFoundResult();
        }
        [HttpGet]
        public ActionResult Records(IEnumerable<MixedContentRequest> references)
        {
            return new NotFoundResult();
        }
    }

    public class MixedContentRequest
    {
        public Guid Type { get; set; }
        public Guid Id { get; set; }
    }

    public class SearchController
    {
        [HttpGet]
        public ActionResult Resources(ResourceRestriction restrictions)
        {
            return new EmptyResult();
        }
    }

    public class Restrictions
    {
        public ICollection<Guid> TypeIds { get; set; } //Returns only resource of these types
        public ICollection<string> Texts { get; set; } //Find this kind of text ...
        public ICollection<ResourceRestriction> Relations { get; set; }
    }
    public class ResourceRestriction
    {
        //Indicates to which resource the restriction applies
        public ResourceReference ResoureReference { get; set; }
        //Indicates if it should be a direct link, or a link to a link, ...
        public int Distance { get; set; }
    }



    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
