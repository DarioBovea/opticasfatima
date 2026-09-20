import React from 'react';

interface SeparatorProps {
  title?: string;
}

export const FeaturedServicesSeparator: React.FC<SeparatorProps> = ({ 
  title = "Servicios" 
}) => {
  return (
    <div className="w-full text-center select-none">
      {/* Texto del título */}
      <h2 className="mx-auto mb-2 w-4/5 text-center text-3xl font-bold">
        {title}
      </h2>
      
      {/* Contenedor de la línea con el triángulo */}
      <div className="relative w-full flex items-center justify-center">
        {/* Línea horizontal izquierda */}
        <div className="flex-grow border-b border-[#0d3857]" />
        
        {/* El triángulo (Flecha hacia arriba) posicionado levemente arriba */}
        <div className="relative w-0 h-0 -translate-y-[4px]
                    border-x-[9px] border-x-transparent 
                    border-b-[9px] border-b-[#0d3857]
                    after:content-[''] after:absolute 
                    after:top-[1px] after:left-[-9px] 
                    after:w-0 after:h-0 
                    after:border-x-[9px] after:border-x-transparent 
                    after:border-b-[9px] after:border-b-white" 
        />
        
        {/* Línea horizontal derecha */}
        <div className="flex-grow border-b border-[#0d3857]" />
      </div>
    </div>
  );
};
