<%@ include file="/init.jsp" %>


<%
    String cssStyle = "";
    String backgroundColor = renderRequest.getParameter("backgroundColor"

    if(backgroundColor != null &&!backgroundColor.isEmpty())
        cssStyle = String.format("backgound-color:%s;", backgroundColor);
%>
<div style="<%= cssStyle %>">
    <p>
        <b><liferay-ui:message key="sorteio.caption"/></b>
    </p>
</div>

<portlet:renderURL var="vieWBlueURL">
    <portlet:param name="backgroundColor" value="blue"/>
</portlet:renderURL>

<a href="<%=vieWBlueURL%>"> alterar para color azul </a>
