<h1>API for Real Estate companies</h1>
<p>This is a sample API for Real Estate Companies, capable of cataloging properties (for sale and rental), their categories and features, manage their users (customers and realtors), and much more.</p>
<p>The <strong>documentation</strong> and all <strong>test routes</strong> can be found here: <a href="http://54.196.86.170/api-docs/">Real Estate API docs</a> (deployed in a <strong>AWS EC2</strong> t2.micro with <strong>CI/CD</strong> provided by <strong>GitHub actions</strong>)</p>

<p>This <strong>RESTful API</strong> was built using this tecnologies:</p>

<ul>
	<li>Core: <strong>NodeJS</strong> with <strong>ExpressJS</strong> 
	framework</li>
  <li>Language: <strong>TypeScript</strong> with <strong>JavaScript</strong> when required</li>
	<li>Database: <strong>PostgreSQL</strong> with <strong>PrismaORM</strong></li>
	<li>Testing: <strong>Jest</strong> for unit testing <strong>Supertest</strong> for integration</li>
	<li>Documentation: <strong>Swagger</strong> with <strong>Open API 3</strong></li>
	<li>Containerization: <strong>Docker</strong></li>
	<li>Storage: <strong>Cloudinary</strong> or <strong>AWS S3</strong></li>
	<li>Dates: <strong>DayJS</strong></li>
	<li>Email: <strong>Ethereal</strong></li>
	<li>Security: <strong>Rate Limiter Flexible</strong> with <strong>Redis</strong></li>
	<li>Standardization: <strong>ESLint</strong> and <strong>Prettier</strong></li>
</ul>

I tried to follow most <strong>SOLID</strong> principles, apply <strong>TDD</strong> and <strong>DDD</strong>, while keeping <strong>OOP</strong> best practices. Most implementations follow a interface to facilitate exchange of providers.

<strong>#TODO</strong>

<ul>
	<li>Fix some of the routes</li>
	<li>Testing should cover at least 90% of use cases</li>
	<li>Improve and extend documentation</li>
	<li>Add different implementations for date and email</li>
	<li>Add domain and SSL</li>
</ul>