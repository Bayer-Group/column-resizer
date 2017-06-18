/**
 * Created by jjglyn on 1/30/17.
 */
import {expect} from 'chai';
import ColumnResizer from '../src/ColumnResizer';

describe('extend remote table', () => {
    const table = document.querySelector('#parent-resizable');
    const remote = document.querySelector('#parent-resizableremote');
    const resizer = new ColumnResizer(table);
    const headers = resizer.getTableHeaders(table);
    resizer.extendRemoteTable(remote, headers, table);

    it('should assign the remote table', () => {
        expect(table.remote).to.equal(remote);
    });
    it('should set the remote id', () => {
        expect(remote.id).to.equal(table.getAttribute('id') + 'remote');
    });
    it('should set the columns to match the headers', () => {
        expect(remote.columns.length).to.equal(headers.length);
    });
    it('should set the style', () => {
        expect(remote.tableWidth).to.equal(table.tableWidth);
        expect(remote.cellSpace).to.equal(table.cellSpace);
        expect(remote.borderSpace).to.equal(table.borderSpace);
    });
    it('should set up the column group', () => {
        expect(remote.columnGrp.length).to.equal(headers.length);
    });
});