import type { Shoe } from "@/data/shoes";
import { formatStack } from "@/lib/shoe-helpers";

type SpecsTableProps = {
  shoes: Shoe[];
  showDifferencesOnly?: boolean;
};

type Row = {
  id: string;
  label: string;
  values: string[];
};

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function SpecsTable({ shoes, showDifferencesOnly = false }: SpecsTableProps) {
  const rows: Row[] = [
    {
      id: "stack",
      label: "Stack",
      values: shoes.map((shoe) => formatStack(shoe))
    },
    {
      id: "drop",
      label: "Drop",
      values: shoes.map((shoe) => `${shoe.specs.drop.value}${shoe.specs.drop.unit}`)
    },
    {
      id: "lug",
      label: "Tacs",
      values: shoes.map((shoe) => `${shoe.specs.lug.value}${shoe.specs.lug.unit}`)
    },
    {
      id: "weight",
      label: "Pes",
      values: shoes.map(
        (shoe) => `${shoe.specs.weight.value}${shoe.specs.weight.unit} (${shoe.specs.weight.reference})`
      )
    },
    {
      id: "conditions",
      label: "Condicions",
      values: shoes.map((shoe) => shoe.conditions.join(", "))
    },
    {
      id: "technology",
      label: "Tecnologies",
      values: shoes.map((shoe) => shoe.technologies.join(", "))
    },
    {
      id: "bestfor",
      label: "Ideal per",
      values: shoes.map((shoe) => shoe.bestFor.join(" | "))
    }
  ];

  const filteredRows = showDifferencesOnly
    ? rows.filter((row) => {
        const base = normalize(row.values[0] ?? "");
        return row.values.some((value) => normalize(value) !== base);
      })
    : rows;

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
      <table className="min-w-full divide-y divide-[var(--border)] text-sm">
        <caption className="sr-only">Taula comparativa d'especificacions</caption>
        <thead className="bg-sand text-left text-xs uppercase tracking-wide">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">
              Especificació
            </th>
            {shoes.map((shoe) => (
              <th key={shoe.id} scope="col" className="px-4 py-3 font-bold">
                {shoe.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {filteredRows.map((row) => (
            <tr key={row.id}>
              <th scope="row" className="w-44 px-4 py-3 text-left font-bold">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td key={`${row.id}-${shoes[index].id}`} className="px-4 py-3 font-light align-top">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
