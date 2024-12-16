def process_input(input_text):
    # Split input_text into lines
    lines = input_text.strip().split('\n')
    
    # Define mappings for replacements
    replacements = {
        '[Status_Chamada]': '{global:tipoDesconexao}',
        '[Ultimo_Ponto]': '{global:ultimoPonto}',
        '[Ultimo_Ponto_Da_Chamada]': '{global:ultimoPonto}',
        '[Ultimo_Ponto_Fluxo_Anterior]': '{ultimoPontoFluxoAnterior}',
        '[Fluxo_Anterior]': '{global:fluxoAnterior}',
        '[Input_Cliente]': '{MRES}',
        '[Status_Code]': '{global:statusCode}',
        '[Produto]': '{global:Tag_produto}',
        'Timestamp:': ''  # This will delete the entire line containing 'Timestamp:'
    }
    
    processed_lines = []
    
    for line in lines:
        # Remove leading and trailing whitespace
        line = line.strip()
        
        # Check if the line contains 'Timestamp:' to delete it
        if 'Timestamp:' in line:
            continue  # Skip this line
        
        # Remove the label (part before the colon :)
        # Implement this later
            #characters = [':', ' ']
            #colon_index = min(line.find(char) for char in characters)
        colon_index = line.find(':')
        if colon_index != -1:
            line = line[colon_index + 1:].strip()
        
        # Replace [Status_Chamada] and [Ultimo_Ponto] with {global}
        for key, value in replacements.items():
            if key in line:
                line = line.replace(key, value)
        
        # Append the processed line
        processed_lines.append(line)
    
    # Join processed lines into a single string with newlines
    processed_text = '\n'.join(processed_lines)
    
    return processed_text

# Example usage:
input_text = """
event_name: perfil_cliente
Validacao: Segurado
Fluxo: Menu_Chutes
Indicador: [Status_Chamada]
Range: 16000
Ponto: 16011
Ultimo_Ponto: [Ultimo_Ponto]
Input:
Tentativa:
Ponto_Origem:
Produto: Cobranca_Seguros
Timestamp: [Time_Stamp]
"""

output_text = process_input(input_text)
print(output_text)
