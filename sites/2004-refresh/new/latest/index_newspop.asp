<%

sNewsContent = request.querystring("updates")

if sNewsContent = "6" then
	sNewsContent = "0"
end if

'this is where the content gets added. The latest news is at line 26.
Select Case sNewsContent
	Case 1
		sContent = "Everyone have a wonderful New Year and remember - every day is a new day."
		sDate = "12/31/03"
	Case 2
		sContent = "Launch of the temp site. Full site will be up in a month or two. In the meantime, look at Shift online - www.shift.jp.org - I am proud to have work featured in the latest 2004 calendar."
		sDate = "12/11/03"
	Case 3
		sContent = "Nothing here - look no further. . ."
		sDate = "12/9/03"
End Select
 %>
<html>
<head>
<title>IAAH&#153; / News</title>
<style type="text/css">
	.content{
		font-family : Verdana;
		font-size : 9px;
		color : Black;
		line-height : 18px;
	}
	.contentbold{
		font-family : Verdana;
		font-size : 9px;
		color : Black;
		font-weight: bold;
		line-height : 18px;
	}
</style>
</head>
<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bottommargin="0" rightmargin="0" leftmargin="0">
	<table width="350" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td colspan="7"><img src="images/News-POP_01.jpg" width="350" height="65"></td>
		</tr>
		<tr>
			<td colspan="7" height="108"><table cellspacing="0" cellpadding="0" border="0" width="362">
			<tr>
			    <td rowspan="2" width="12" valign="top"><img src="images/spacer.gif" width="21" height="100" alt="" border="0"></td>
			    <td class="contentbold" valign="top"><%= Left(sDate,10) %>:</td>
			</tr>
			<tr>
			    <td class="content" valign="top" height="90" width="320"><%= sContent %></td>
			</tr>
			</table></td>
		</tr>
		<tr>
			<td colspan="7"><img src="images/News-POP_03.jpg" width="350" height="9"></td>
		</tr>
		<tr>
			<td><img src="images/News-POP_04.jpg" width="20" height="17"></td>
			<td><a href="index_newspop.asp?updates=<%= sNewsContent + 1 %>"><img src="images/News-POP_05.jpg" width="51" height="17" border="0"></a></td>
			<td><%if sNewsContent = "" or sNewsContent = "0"  then%>&nbsp;<%else%><img src="images/News-POP_06.jpg" width="6" height="17"><%end if%></td>
			<td><%if sNewsContent = "" or sNewsContent = "0"  then%>&nbsp;<%else%><a href="index_newspop.asp?updates=<%= sNewsContent -1 %>"><img src="images/News-POP_07.jpg" width="29" height="17" border="0"></a><%end if%></td>
			<td><img src="images/News-POP_08.jpg" width="184" height="17"></td>
			<td><a href="javascript: window.close();"><img src="images/News-POP_09.jpg" width="49" height="17" border="0"></a></td>
			<td><img src="images/News-POP_10.jpg" width="11" height="17"></td>
		</tr>
		<tr>
			<td colspan="7"><img src="images/News-POP_11.jpg" width="350" height="9"></td>
		</tr>
	</table>
</body>
</html>
