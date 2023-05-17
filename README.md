# resource-id

Developer-friendly k-sortable IDs made easy.

`resource-id` is a thin wrapper over the [`ksuid`](https://www.npmjs.com/package/ksuid) package which adds prefixing support to your generated KSUIDs. This means you get to work with nice, friendly ID values like `user_2PujppDF9V5NuhAdeiXIpVDnTS0`.

KSUIDs are used for the ID value as they are k-sortable, which gives you a creation timestamp for free and makes bulk inserts fast. Check out my blog post ["Object IDs for Humans"](https://sophiabits.com/blog/object-ids-for-humans) for more discussion on ID formats.

## Installation

```
$ npm install resource-id
$ yarn add resource-id
$ pnpm add resource-id
```

## Usage

```ts
import * as ResourceId from 'resource-id';

// Generate an ID
ResourceId.generate('team'); // team_2Puj4cRrOXWtpWazqRtAlwxEF4f

// Validate an ID
ResourceId.isValid(ResourceId.generate('team')); // true
ResourceId.isValid('foobar'); // false

// Parse a resource ID
ResourceId.parse('sub_2PujFk6avgd3RBEZRnu3hkRt0Vg'); // { ksuid: '2PujFk6avgd3RBEZRnu3hkRt0Vg', prefix: 'sub' }

// Compare
ResourceId.compare(yesterdayId, todayId); // -1
ResourceId.compare(todayId, todayId); // 0
ResourceId.compare(todayId, yesterdayId); // 1
```
