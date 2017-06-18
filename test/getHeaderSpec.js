/**
 * Created by jjglyn on 1/26/17.
 */
import {expect} from 'chai';
import ColumnResizer from '../src/ColumnResizer';

describe('Get Headers', () => {
    it('should find the headers', () => {
        const table = document.querySelector('#parent-resizable');
        const resizer = new ColumnResizer(table, {disable: true});
        const headers = resizer.getTableHeaders(table);
        expect(headers.length).to.equal(5);
    });
    it('should find the remote headers', () => {
        const table = document.querySelector('#parent-resizable');
        const resizer = new ColumnResizer(table, {disable: true});
        const remote = document.querySelector('#parent-resizableremote');
        const headers = resizer.getTableHeaders(remote);
        expect(headers.length).to.equal(5);
    });
});