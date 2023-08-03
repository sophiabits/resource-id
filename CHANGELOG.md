# Changelog

## Unreleased

## 0.0.3

### Added

- New `Id<T>` type, which represents a resource ID with prefix `T`

### Changed

- BREAKING: Minimum Node.js version increased from 14 to 15.
- Now works in Edge runtime thanks to [`ksuid-edge`](https://www.npmjs.com/package/ksuid-edge)
- `generate` function now returns an `Id<T>` type instead of a `string`
- Improved `parse` function error messages

## 0.0.2

Initial release
