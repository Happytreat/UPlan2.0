## Testing new API endpoints on localhost

#### API Test Commands
```javascript
serverless invoke local --function createSemester --path mocks/create-semester.json
serverless invoke local --function getSemester --path mocks/get-semester.json
```