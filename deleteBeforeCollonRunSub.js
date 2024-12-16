// Function to process the HTML content
function processHtmlPage(htmlContent) {
    // Create a temporary div element to hold the HTML content
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent.trim();
    
    // Define mappings for replacements
    var replacements = {
        '[Status_Chamada]': '{global}',
        '[Ultimo_Ponto]': '{global}',
        'Timestamp:': ''  // This will delete the entire line containing 'Timestamp:'
    };

    // Select all <p> tags (you can adjust for other tags as needed)
    var paragraphs = tempDiv.querySelectorAll('p');

    // Array to hold processed lines
    var processedLines = [];

    paragraphs.forEach(function(p) {
        // Get the text content of the paragraph
        var line = p.textContent.trim();

        // Check if the line contains 'Timestamp:' to delete it
        if (line.includes('Timestamp:')) {
            return;  // Skip this line
        }

        // Remove the label (part before the colon :)
        var colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            line = line.substring(colonIndex + 1).trim();
        }

        // Replace [Status_Chamada] and [Ultimo_Ponto] with {global}
        Object.entries(replacements).forEach(function([key, value]) {
            line = line.replace(key, value);
        });

        // Add the processed line to the array
        processedLines.push(line);
    });

    // Join processed lines into a single string with newlines
    var processedHtml = processedLines.join('<br>');

    // Output or use the processed HTML content as needed
    console.log(processedHtml);
    // If you want to update an existing element with the processed content:
    // document.getElementById('output').innerHTML = processedHtml;
}

// Example usage:
var htmlContent = `
<div>
    <p>event_name:cliente_identificado</p>
    <p>Validacao:Identificado</p>
    <p>Fluxo:Ura_Cdc_Inicio_Topo_Ura</p>
    <p>Indicador: [Status_Chamada]</p>
    <p>Range:10500</p>
    <p>Ponto:10508</p>
    <p>Ultimo_Ponto:[Ultimo_Ponto]</p>
    <p>Input:</p>
    <p>Tentativa:</p>
    <p>Ponto_Origem:</p>
    <p>Produto:Cdc</p>
    <p>Timestamp:[Time_Stamp]</p>
</div>
`;

// Call the function with the example HTML content
processHtmlPage(htmlContent);
