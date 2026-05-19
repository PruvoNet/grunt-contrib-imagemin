import fs from 'node:fs';
import path from 'node:path';
import test from 'ava';

// ava v6 treats this file as ESM (it has `import` statements), where
// `__dirname` is not defined. `import.meta.dirname` is Node 20.11+ and
// covers our `engines: >=18` policy in practice — the wrapper's own CI
// runs on Node 24/26 only.
const here = import.meta.dirname;
const fixture = path.join.bind(path, here, 'fixtures');
const tmp = path.join.bind(path, here, '..', 'tmp');

test('minify png', t => {
	const original = fs.readFileSync(fixture('test.png'));
	const actual = fs.readFileSync(tmp('test.png'));

	t.true(actual.length < original.length);
});

test('minify uppercase png', t => {
	const original = fs.readFileSync(fixture('test-uppercase.PNG'));
	const actual = fs.readFileSync(tmp('test-uppercase.PNG'));

	t.true(actual.length < original.length);
});

test('minify jpg', t => {
	const original = fs.readFileSync(fixture('test.jpg'));
	const actual = fs.readFileSync(tmp('test.jpg'));

	t.true(actual.length < original.length);
});

test('minify uppercase jpg', t => {
	const original = fs.readFileSync(fixture('test-uppercase.JPG'));
	const actual = fs.readFileSync(tmp('test-uppercase.JPG'));

	t.true(actual.length < original.length);
});

test('minify gif', t => {
	const original = fs.readFileSync(fixture('test.gif'));
	const actual = fs.readFileSync(tmp('test.gif'));

	t.true(actual.length < original.length);
});

test('minify uppercase gif', t => {
	const original = fs.readFileSync(fixture('test-uppercase.GIF'));
	const actual = fs.readFileSync(tmp('test-uppercase.GIF'));

	t.true(actual.length < original.length);
});

test('nested directories', t => {
	t.true(fs.existsSync(tmp('nested', 'nested', 'test.png')));
});

test('rename', t => {
	t.true(fs.existsSync(tmp('rename.jpg')));
});
