<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:s="http://schemas.microsoft.com/sqlserver/2004/07/showplan"
    exclude-result-prefixes="msxsl s xsl">
  <xsl:output method="html" encoding="utf-8" indent="yes" />
  <xsl:include href="showplan.xslt" />

  <xsl:template match="/">
    <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
      <html>
      <head>
        <title>Execution plan</title>
        <link rel="stylesheet" type="text/css" href="../../dist/css/showplan.css" />
      </head>
      <body style="background-color: #f5f5f5">
        <div style="position:relative;overflow-x:auto" id="container">
          <xsl:apply-templates select="s:ShowPlanXML" />
        </div>
        <script src="http://code.jquery.com/jquery-1.12.2.min.js"></script>
        <script src="../../dist/showplan.js"></script>
        <script>
          $( document ).ready(function() {
            $("#container").centerQueryPlan();
            $("#container").addQueryPlanZoom();
          });
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
