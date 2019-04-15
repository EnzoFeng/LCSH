/**
 * 
 */
package com.lcsh.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

/**
 * @author FengZhen
 *
 */
public class ExcelUtil {

	public static void main(String[] args) throws FileNotFoundException {
		ExcelUtil excelUtil = new ExcelUtil();
		List<Map<Integer, String>> result = excelUtil.readExcelToObj("/Users/FengZhen/Desktop/LCSH/file/upload/联创世华学员信息.xlsx");
		System.out.println(result);
	}

	/**
	 * 读取excel数据
	 * 
	 * @param path
	 * @throws FileNotFoundException
	 */
	public List<Map<Integer, String>> readExcelToObj(String path) throws FileNotFoundException {

		Workbook wb = null;
		InputStream input = new FileInputStream(path); // 建立输入流
		List<Map<Integer, String>> result = new ArrayList<Map<Integer, String>>();
		try {
			wb = new XSSFWorkbook(input);
			int rowCount = wb.getSheetAt(0).getLastRowNum();
			System.out.println("rowCount=" + rowCount);
			for (int i = 2; i <= rowCount; i++) {
				Map<Integer, String> map = readSingleRow(wb, 0, i);
				result.add(map);
			}
			return result;
		} catch (InvalidFormatException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 读取excel的某一行
	 * 
	 * @param wb
	 * @param sheetIndex
	 *            sheet页下标：从0开始
	 * @param rowNum
	 *            开始读取的行
	 * @param columnNum
	 *            开始读取的列
	 */
	public String readSingleRowColumn(Workbook wb, int sheetIndex, int rowNum, int columnNum) {
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = sheet.getRow(rowNum);
		Cell cell = row.getCell(columnNum);
		// cell.setCellType(Cell.CELL_TYPE_STRING);
		boolean isMerge = isMergedRegion(sheet, rowNum, columnNum);
		String info;
		// 判断是否具有合并单元格
		if (isMerge) {
			String rs = getMergedRegionValue(sheet, row.getRowNum(), cell.getColumnIndex());
			info = rs;
		} else {
			info = getCellValue(cell);
		}
		return info;
	}

	/**
	 * 读取excel的某一行
	 * 
	 * @param wb
	 * @param sheetIndex
	 *            sheet页下标：从0开始
	 * @param rowNum
	 *            开始读取的行:从0开始
	 */
	@SuppressWarnings("deprecation")
	public Map<Integer, String> readSingleRow(Workbook wb, int sheetIndex, int rowNum) {
		Map<Integer, String> map = new HashMap<Integer, String>();
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = sheet.getRow(rowNum);
		for (Cell c : row) {
			String info;
			boolean isMerge = isMergedRegion(sheet, rowNum, c.getColumnIndex());
			// 判断是否具有合并单元格
			if (isMerge) {
				String rs = getMergedRegionValue(sheet, row.getRowNum(), c.getColumnIndex());
				info = rs;
			} else {
				DecimalFormat df = new DecimalFormat("#");
				info = getCellValue(c);
			}

			// System.out.println(rowNum+"行"+c.getColumnIndex()+"列:"+info);
			map.put(c.getColumnIndex(), dealNull(info));
		}

		return map;

	}

	/**
	 * 读取excel文件
	 * 
	 * @param wb
	 * @param sheetIndex
	 *            sheet页下标：从0开始
	 * @param startReadLine
	 *            开始读取的行:从0开始
	 * @param tailLine
	 *            去除最后读取的行
	 */
	public void readExcel(Workbook wb, int sheetIndex, int startReadLine, int tailLine) {
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = null;

		for (int i = startReadLine; i < sheet.getLastRowNum() - tailLine + 1; i++) {
			row = sheet.getRow(i);
			for (Cell c : row) {
				String info;
				boolean isMerge = isMergedRegion(sheet, i, c.getColumnIndex());
				// 判断是否具有合并单元格
				if (isMerge) {
					String rs = getMergedRegionValue(sheet, row.getRowNum(), c.getColumnIndex());
					info = rs;
				} else {
					info = getCellValue(c);
				}
				// System.out.println(i+"行"+c.getColumnIndex()+"列:"+info);
			}
		}
	}

	/**
	 * 获取合并单元格的值
	 * 
	 * @param sheet
	 * @param row
	 * @param column
	 * @return
	 */
	public String getMergedRegionValue(Sheet sheet, int row, int column) {
		int sheetMergeCount = sheet.getNumMergedRegions();
		for (int i = 0; i < sheetMergeCount; i++) {
			CellRangeAddress ca = sheet.getMergedRegion(i);
			int firstColumn = ca.getFirstColumn();
			int lastColumn = ca.getLastColumn();
			int firstRow = ca.getFirstRow();
			int lastRow = ca.getLastRow();

			if (row >= firstRow && row <= lastRow) {

				if (column >= firstColumn && column <= lastColumn) {
					Row fRow = sheet.getRow(firstRow);
					Cell fCell = fRow.getCell(firstColumn);
					return getCellValue(fCell);
				}
			}
		}

		return null;
	}

	/**
	 * 判断合并了行
	 * 
	 * @param sheet
	 * @param row
	 * @param column
	 * @return
	 */
	@SuppressWarnings("unused")
	private boolean isMergedRow(Sheet sheet, int row, int column) {
		int sheetMergeCount = sheet.getNumMergedRegions();
		for (int i = 0; i < sheetMergeCount; i++) {
			CellRangeAddress range = sheet.getMergedRegion(i);
			int firstColumn = range.getFirstColumn();
			int lastColumn = range.getLastColumn();
			int firstRow = range.getFirstRow();
			int lastRow = range.getLastRow();
			if (row == firstRow && row == lastRow) {
				if (column >= firstColumn && column <= lastColumn) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 判断指定的单元格是否是合并单元格
	 * 
	 * @param sheet
	 * @param row
	 *            行下标
	 * @param column
	 *            列下标
	 * @return
	 */
	private boolean isMergedRegion(Sheet sheet, int row, int column) {
		int sheetMergeCount = sheet.getNumMergedRegions();
		for (int i = 0; i < sheetMergeCount; i++) {
			CellRangeAddress range = sheet.getMergedRegion(i);
			int firstColumn = range.getFirstColumn();
			int lastColumn = range.getLastColumn();
			int firstRow = range.getFirstRow();
			int lastRow = range.getLastRow();
			if (row >= firstRow && row <= lastRow) {
				if (column >= firstColumn && column <= lastColumn) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 判断sheet页中是否含有合并单元格
	 * 
	 * @param sheet
	 * @return
	 */
	@SuppressWarnings("unused")
	private boolean hasMerged(Sheet sheet) {
		return sheet.getNumMergedRegions() > 0 ? true : false;
	}

	/**
	 * 合并单元格
	 * 
	 * @param sheet
	 * @param firstRow
	 *            开始行
	 * @param lastRow
	 *            结束行
	 * @param firstCol
	 *            开始列
	 * @param lastCol
	 *            结束列
	 */
	@SuppressWarnings("unused")
	private void mergeRegion(Sheet sheet, int firstRow, int lastRow, int firstCol, int lastCol) {
		sheet.addMergedRegion(new CellRangeAddress(firstRow, lastRow, firstCol, lastCol));
	}

	/**
	 * 获取单元格的值
	 * 
	 * @param cell
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public String getCellValue(Cell cell) {

		if (cell == null)
			return "";

		if (cell.getCellType() == Cell.CELL_TYPE_STRING) {

			return cell.getStringCellValue();

		} else if (cell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {

			return String.valueOf(cell.getBooleanCellValue());

		} else if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {

			return cell.getCellFormula();

		} else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
			String datestr = "";
			if (isCellDateFormatted(cell)) {
				Date date = cell.getDateCellValue();
				DateFormat formater = new SimpleDateFormat("yyyy/MM/dd");
				datestr = formater.format(date);
			} else {
				DecimalFormat decimalFormat = new DecimalFormat("###################.###########");
				datestr = decimalFormat.format(cell.getNumericCellValue());
			}
			return datestr;
		}
		return "";
	}

	/**
	 * 判断cell类型是否为日期型
	 * 
	 * @title:
	 * @description:
	 * @date
	 * @param Cell
	 *            cell
	 * @return true 是日期类型 false 否，不是日期类型
	 * @throws Exception
	 */
	private boolean isCellDateFormatted(Cell cell) {
		if (cell == null)
			return false;
		boolean isDate = false;
		double d = cell.getNumericCellValue();
		if (DateUtil.isValidExcelDate(d)) {
			CellStyle style = cell.getCellStyle();
			if (style == null)
				return false;
			int i = style.getDataFormat();
			String f = style.getDataFormatString();
			isDate = DateUtil.isADateFormat(i, f);
		}
		return isDate;
	}

	public String dealNull(String string) {
		string.replaceAll(" ", "");
		if (null == string || "".equals(string) || " ".equals(string) || "null".equals(string)) {
			return "";
		}
		return string;
	}

}
