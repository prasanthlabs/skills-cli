# shadcn/ui Expert

You are an expert in shadcn/ui — a collection of copy-paste React components built on Radix UI primitives and styled with Tailwind CSS v4.

## Core Philosophy

**shadcn/ui is NOT a component library you install from npm.** It is a code distribution system — you copy component source code directly into your project under `components/ui/`. You own the code. You can modify it. There is no version lock-in.

- Components live in your project at `components/ui/<name>.tsx`
- Import from `@/components/ui/<name>`
- Full source is yours to edit
- Uses Tailwind CSS v4 + CSS variables for theming
- Built on Radix UI primitives (accessible by default)
- AI-Ready: open code that LLMs can read, understand, and improve

---

## Installation

### New project (choose your framework)
```bash
npx shadcn@latest init -t next          # Next.js
npx shadcn@latest init -t vite          # Vite
npx shadcn@latest init -t react-router  # React Router
npx shadcn@latest init -t astro         # Astro
npx shadcn@latest init -t laravel       # Laravel
```

### Existing project
```bash
npx shadcn@latest init
```

### Add components
```bash
npx shadcn@latest add button
npx shadcn@latest add card dialog input   # multiple at once
npx shadcn@latest add --all               # all components
```

### Preview before installing
```bash
npx shadcn@latest view button
npx shadcn@latest view card dialog
```

---

## Available Components (52)

| Component | CLI name | Import path |
|---|---|---|
| Accordion | `accordion` | `@/components/ui/accordion` |
| Alert | `alert` | `@/components/ui/alert` |
| Alert Dialog | `alert-dialog` | `@/components/ui/alert-dialog` |
| Aspect Ratio | `aspect-ratio` | `@/components/ui/aspect-ratio` |
| Avatar | `avatar` | `@/components/ui/avatar` |
| Badge | `badge` | `@/components/ui/badge` |
| Breadcrumb | `breadcrumb` | `@/components/ui/breadcrumb` |
| Button | `button` | `@/components/ui/button` |
| Button Group | `button-group` | `@/components/ui/button-group` |
| Calendar | `calendar` | `@/components/ui/calendar` |
| Card | `card` | `@/components/ui/card` |
| Carousel | `carousel` | `@/components/ui/carousel` |
| Chart | `chart` | `@/components/ui/chart` |
| Checkbox | `checkbox` | `@/components/ui/checkbox` |
| Collapsible | `collapsible` | `@/components/ui/collapsible` |
| Combobox | `combobox` | `@/components/ui/combobox` |
| Command | `command` | `@/components/ui/command` |
| Context Menu | `context-menu` | `@/components/ui/context-menu` |
| Data Table | `data-table` | `@/components/ui/data-table` |
| Date Picker | `date-picker` | `@/components/ui/date-picker` |
| Dialog | `dialog` | `@/components/ui/dialog` |
| Drawer | `drawer` | `@/components/ui/drawer` |
| Dropdown Menu | `dropdown-menu` | `@/components/ui/dropdown-menu` |
| Empty | `empty` | `@/components/ui/empty` |
| Field | `field` | `@/components/ui/field` |
| Hover Card | `hover-card` | `@/components/ui/hover-card` |
| Input | `input` | `@/components/ui/input` |
| Input Group | `input-group` | `@/components/ui/input-group` |
| Input OTP | `input-otp` | `@/components/ui/input-otp` |
| Kbd | `kbd` | `@/components/ui/kbd` |
| Label | `label` | `@/components/ui/label` |
| Menubar | `menubar` | `@/components/ui/menubar` |
| Native Select | `native-select` | `@/components/ui/native-select` |
| Navigation Menu | `navigation-menu` | `@/components/ui/navigation-menu` |
| Pagination | `pagination` | `@/components/ui/pagination` |
| Popover | `popover` | `@/components/ui/popover` |
| Progress | `progress` | `@/components/ui/progress` |
| Radio Group | `radio-group` | `@/components/ui/radio-group` |
| Resizable | `resizable` | `@/components/ui/resizable` |
| Scroll Area | `scroll-area` | `@/components/ui/scroll-area` |
| Select | `select` | `@/components/ui/select` |
| Separator | `separator` | `@/components/ui/separator` |
| Sheet | `sheet` | `@/components/ui/sheet` |
| Sidebar | `sidebar` | `@/components/ui/sidebar` |
| Skeleton | `skeleton` | `@/components/ui/skeleton` |
| Slider | `slider` | `@/components/ui/slider` |
| Sonner (Toast) | `sonner` | `@/components/ui/sonner` |
| Spinner | `spinner` | `@/components/ui/spinner` |
| Switch | `switch` | `@/components/ui/switch` |
| Table | `table` | `@/components/ui/table` |
| Tabs | `tabs` | `@/components/ui/tabs` |
| Textarea | `textarea` | `@/components/ui/textarea` |
| Toggle | `toggle` | `@/components/ui/toggle` |
| Toggle Group | `toggle-group` | `@/components/ui/toggle-group` |
| Tooltip | `tooltip` | `@/components/ui/tooltip` |

---

## Usage Examples

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="link">Link style</Button>
<Button disabled>Disabled</Button>
<Button size="icon"><TrashIcon /></Button>
```
**Variants:** `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
**Sizes:** `default` | `sm` | `lg` | `icon`

### Card
```tsx
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
    <CardDescription>Track progress and recent activity.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog
```tsx
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    {/* form content */}
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Input + Label
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="name@example.com" />
</div>
```

### Select
```tsx
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"

<Select onValueChange={(value) => console.log(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
    <SelectItem value="c">Option C</SelectItem>
  </SelectContent>
</Select>
```

### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</Tabs>
```

### Dropdown Menu
```tsx
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Toast (Sonner — v4 standard)
```tsx
// 1. Add <Toaster /> once in your root layout
import { Toaster } from "@/components/ui/sonner"
export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// 2. Use toast() anywhere
import { toast } from "sonner"

toast("Event created successfully")
toast.success("Changes saved")
toast.error("Something went wrong")
toast.warning("Disk space low")
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
})
```

### Skeleton (loading state)
```tsx
import { Skeleton } from "@/components/ui/skeleton"

<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

### Sheet (side panel)
```tsx
import {
  Sheet, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Panel</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
      <SheetDescription>Description text here.</SheetDescription>
    </SheetHeader>
    <div className="py-4">Panel content</div>
  </SheetContent>
</Sheet>
```
**sides:** `top` | `right` | `bottom` | `left`

### Form with react-hook-form + zod (recommended pattern)
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(2).max(50),
})

export function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", username: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormDescription>Your work email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

## Theming (Tailwind v4 + CSS Variables)

shadcn/ui v4 uses semantic CSS variable pairs with `oklch()` color values. Each surface has a matching `-foreground` text color.

### Default theme (globals.css)
```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
}
```

### Token reference
| Token | Tailwind class | Purpose |
|---|---|---|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Default text |
| `--primary` | `bg-primary` | Brand / default button fill |
| `--primary-foreground` | `text-primary-foreground` | Text on primary |
| `--secondary` | `bg-secondary` | Subtle fills, secondary buttons |
| `--muted` | `bg-muted` | Disabled / placeholder surfaces |
| `--muted-foreground` | `text-muted-foreground` | Descriptions, subdued text |
| `--accent` | `bg-accent` | Hover / focus states |
| `--destructive` | `bg-destructive` | Delete / danger actions |
| `--border` | `border-border` | All borders and separators |
| `--input` | (used internally) | Form control borders |
| `--ring` | `ring-ring` | Focus rings |
| `--radius` | `rounded-lg` etc. | Base corner radius |

### Add a custom token
```css
/* globals.css */
:root   { --warning: oklch(0.84 0.16 84); --warning-foreground: oklch(0.28 0.07 46); }
.dark   { --warning: oklch(0.41 0.11 46); --warning-foreground: oklch(0.99 0.02 95); }
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```
Use as: `bg-warning text-warning-foreground`

---

## Key Patterns

### `cn()` for conditional classes
```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "outline" && "border border-border",
  className
)} />
```

### `asChild` to avoid nested interactive elements
```tsx
// CORRECT — renders a single <a> element
<DialogTrigger asChild>
  <Link href="/docs">Open docs</Link>
</DialogTrigger>

// WRONG — renders <button><a> which is invalid HTML
<DialogTrigger>
  <Link href="/docs">Open docs</Link>
</DialogTrigger>
```

### Loading button state
```tsx
import { Loader2 } from "lucide-react"

const [loading, setLoading] = useState(false)

<Button disabled={loading} onClick={async () => {
  setLoading(true)
  await doSomething()
  setLoading(false)
}}>
  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {loading ? "Saving..." : "Save"}
</Button>
```

### Controlled dialog
```tsx
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    ...
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogContent>
</Dialog>
```

---

## CLI Reference

```bash
npx shadcn@latest init              # set up project
npx shadcn@latest add <component>   # install component
npx shadcn@latest view <component>  # preview source
npx shadcn@latest search @shadcn    # search registry
npx shadcn@latest docs <component>  # fetch API docs
npx shadcn@latest info              # show project config
npx shadcn@latest migrate radix     # migrate @radix-ui/* → radix-ui
npx shadcn@latest migrate rtl       # add RTL support
```

---

## Common Mistakes

| Wrong | Right |
|---|---|
| `npm install shadcn-ui` | `npx shadcn@latest add <component>` |
| Import from `shadcn-ui` | Import from `@/components/ui/<name>` |
| Multiple `<Toaster />` in app | Single `<Toaster />` in root layout only |
| `useToast()` hook | `import { toast } from "sonner"` |
| Nesting `<a>` inside `<Button>` | Use `asChild` prop |
| Editing files in `node_modules` | Edit `components/ui/<name>.tsx` directly |
| HSL color values for custom tokens | Use `oklch()` values in v4 |
