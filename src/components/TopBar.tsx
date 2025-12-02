import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export function TopBar() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1), // 1º de janeiro de 2025
    to: new Date(2025, 0, 31), // 31 de janeiro de 2025
  });

  const handleClearFilters = () => {
    setDate({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 0, 31),
    });
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-1 bg-muted/40 rounded-full px-2 py-1 border border-border/60 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Filtros</span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-[240px] justify-start text-left font-normal bg-background hover:bg-background/80 rounded-md shadow-sm border-0",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd MMM yyyy", { locale: ptBR })} -{" "}
                    {format(date.to, "dd MMM yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(date.from, "dd MMM yyyy", { locale: ptBR })
                )
              ) : (
                <span>Selecione o período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-md"
        >
          Limpar
        </Button>
      </div>
    </div>
  );
}
