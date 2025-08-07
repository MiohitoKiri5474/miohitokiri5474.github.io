---
title: "Zenful Terminal Setup"
pubDate: 2024-11-8 23:40:45
heroImage: "https://github.com/MiohitoKiri5474/.dotfiles/blob/main/images/cover.png?raw=true"
tags:
  - iTerm2
  - zsh
  - NeoVim
  - LazyVim
---

## Before We Start

我真的是蓋 config 蓋上癮了欸，每過一陣子就會蓋新的 config，不蓋就會渾身不舒服

NeoVim 大致上延續了 [上一篇](/code/terminalsetup-2024/) 的設定，不過還是會再提一次，像是做了哪些額外設定之類的

先上個 [dotfile 連結](https://github.com/MiohitoKiri5474/.dotfiles)

## Requirements

- Neovim >= **0.9.0** (needs to be built with **LuaJIT**)
- Git >= **2.19.0** (for partial clones support)
- [LazyVim](https://www.lazyvim.org/)
- a [Nerd Font](https://www.nerdfonts.com/)(v3.0 or greater) **_(optional, but needed to display some icons)_**
  I'm using SauceCode Pro.
- a **C** compiler for `nvim-treesitter`. [More information](https://github.com/nvim-treesitter/nvim-treesitter#requirements)
- Node.js & NPM
- Python3, pip3, python3-venv
- Golang
- Rust
  - Recommend using install [script](https://www.rust-lang.org/tools/install)
- for [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim) **_(optional)_**
  - **live grep**: [ripgrep](https://github.com/BurntSushi/ripgrep)
  - **find files**: [fd](https://github.com/sharkdp/fd)

## NeoVim

關於 NeoVim config 的撰寫方式和 lazy.nvim 的使用請去看 [上一篇](/code/terminalsetup-2024/#lazyvim-file-structure) 的說明，這邊不再贅述

大致上的套件設定都差不多，不過現在我把幾乎所有 plugin 都拆開來放了
主要原因是有次我要改某個 plugin 的 config，一時之間想不起來丟去哪，最後要把全部的檔案都打開來看一次

> 雖然檔案比較少看起來比較簡潔，但我認為（至少現在的我認為）效率還是比較重要的

基礎的設定（如 tab size 或 key mapping）也都相同，這邊會跳過。

### Color Scheme

一樣沿用 solarized-osaka.nvim

> 我真的好喜歡這個 color scheme，喜歡到甚至連 oh my posh 和 tmux 都用 solarized-osaka 蓋 config

不過在某次 LazyVim 更新後，不知道為什麼 color scheme 的設定無效了
因此後來我新增了一個套件 [vague2k/huez.nvim](https://github.com/vague2k/huez.nvim) 來管理 color scheme
印象中 huez 可以做更華麗的操作（給不同的情境套用不同的 color scheme 之類的），不過我這邊只有做簡單的設定

```lua
{
    "craftzdog/solarized-osaka.nvim",
    lazy = true,
    priority = 100000000,
    opts = {},
},
{
    "vague2k/huez.nvim",
    -- if you want registry related features, uncomment this
    -- import = "huez-manager.import"
    branch = "stable",
    event = "UIEnter",
    config = function()
        require("huez").setup({})
    end,
},
```

### LazyVim Extra

這一年內多了一些其他需求（例如寫這個網站），偷懶多裝了不少 extra
同樣這些 extra 可以在 LazyVim 的網頁中找到他們具體設定了什麼東西
~~真的不是我想偷懶只是他們網頁中都有說明了我也沒有額外改設定應該不用說明吧~~

```lua
{ import = "lazyvim.plugins.extras.linting.eslint" },
{ import = "lazyvim.plugins.extras.formatting.prettier" },
{ import = "lazyvim.plugins.extras.lang.typescript" },
{ import = "lazyvim.plugins.extras.lang.json" },
{ import = "lazyvim.plugins.extras.lang.tailwind" },
{ import = "lazyvim.plugins.extras.lang.rust" },
{ import = "lazyvim.plugins.extras.lang.clangd" },
{ import = "lazyvim.plugins.extras.lang.python" },
{ import = "lazyvim.plugins.extras.lang.tex" },
{ import = "lazyvim.plugins.extras.lang.go" },
{ import = "lazyvim.plugins.extras.lang.markdown" },
{ import = "lazyvim.plugins.extras.lang.cmake" },
{ import = "lazyvim.plugins.extras.lang.docker" },
{ import = "lazyvim.plugins.extras.util.mini-hipatterns" },
{ import = "lazyvim.plugins.extras.linting.eslint" },
{ import = "lazyvim.plugins.extras.lsp.none-ls" },
{ import = "lazyvim.plugins.extras.editor.navic" },
{ import = "lazyvim.plugins.extras.editor.inc-rename" },
{ import = "lazyvim.plugins.extras.ui.mini-animate" },
{ import = "lazyvim.plugins.extras.util.mini-hipatterns" },
```

### LSP

LSP 的設定變了不少，除了多了不少 LSP 以外，也對幾個比較常用的 LSP 做了設定

```lua
{
    "williamboman/mason.nvim",
    optional = true,
    opts = function(_, opts)
        if type(opts.ensure_installed) == "table" then
            vim.list_extend(opts.ensure_installed, {
                -- Lua related
                "lua-language-server",
                "stylua",
                "luacheck",
                -- C/C++ related
                "clangd",
                "clang-format",
                -- Golang related
                "gopls",
                "golangci-lint-langserver",
                -- Python related
                "pyright",
                "black",
                "isort",
                -- LaTeX related
                "ltex-ls",
                "latexindent",
                -- CSS related
                "typescript-language-server",
                "css-lsp",
                -- TailWindCSS related
                "tailwindcss-language-server",
                "astro-language-server",
                -- JavaScript related
                "eslint_d",
                -- sh related
                "shfmt",
                "shellcheck",
            })
        end
    end,
},
{
    "neovim/nvim-lspconfig",
    opts = {
        inlay_hints = { enabled = true },
        ---@type lspconfig.options
        servers = {
            cssls = {},
            html = {},
            pyright = {},
            gopls = {
                cmd = { "gopls" },
                filetypes = { "go", "gomod", "gowork", "gotmpl" },
                root_dir = require("lspconfig/util").root_pattern("go.work", "go.mod", ".git"),
                autoformat = false,
            },
            ltex = {
                filetypes = { "tex" },
                flags = { debounce_text_changes = 300 },
            },
            tsserver = {
                cmd = { "tsserver" },
                filetypes = { "typescript", "typescriptreact" },
            },
            astro = {},
            clangd = {
                filetypes = { "c", "cpp" },
                cmd = { "clangd" },
                capabilities = vim.lsp.protocol.make_client_capabilities(),
            },
            lua_ls = {
                -- enabled = false,
                single_file_support = true,
                settings = {
                    Lua = {
                        workspace = {
                            checkThirdParty = false,
                        },
                        completion = {
                            workspaceWord = true,
                            callSnippet = "Both",
                        },
                        misc = {
                            parameters = {
                                -- "--log-level=trace",
                            },
                        },
                        hint = {
                            enable = true,
                            setType = false,
                            paramType = true,
                            paramName = "Disable",
                            semicolon = "Disable",
                            arrayIndex = "Disable",
                        },
                        doc = {
                            privateName = { "^_" },
                        },
                        type = {
                            castNumberToInteger = true,
                        },
                        diagnostics = {
                            disable = { "incomplete-signature-doc", "trailing-space" },
                            -- enable = false,
                            groupSeverity = {
                                strong = "Warning",
                                strict = "Warning",
                            },
                            groupFileStatus = {
                                ["ambiguity"] = "Opened",
                                ["await"] = "Opened",
                                ["codestyle"] = "None",
                                ["duplicate"] = "Opened",
                                ["global"] = "Opened",
                                ["luadoc"] = "Opened",
                                ["redefined"] = "Opened",
                                ["strict"] = "Opened",
                                ["strong"] = "Opened",
                                ["type-check"] = "Opened",
                                ["unbalanced"] = "Opened",
                                ["unused"] = "Opened",
                            },
                            unusedLocalExclude = { "_*" },
                        },
                        format = {
                            enable = false,
                            defaultConfig = {
                                indent_style = "space",
                                indent_size = "4",
                                continuation_indent_size = "4",
                            },
                        },
                    },
                },
            },
        },
        setup = {},
    },
},
"nvim-lua/lsp-status.nvim",
{
    "hrsh7th/nvim-cmp",
    dependencies = { "hrsh7th/cmp-emoji" },
    opts = function(_, opts)
        table.insert(opts.sources, { name = "emoji" })
    end,
}
```

### telescope

我砍掉部分 telescope 的 key mapping 了，裡面有些 mapping 真的還沒用到過 = =

```lua
{
	"telescope.nvim",
	dependencies = {
		{
			"nvim-telescope/telescope-fzf-native.nvim",
			build = "make",
		},
		"nvim-telescope/telescope-file-browser.nvim",
	},
	keys = {
		{
			"<leader>fP",
			function()
				require("telescope.builtin").find_files({
					cwd = require("lazy.core.config").options.root,
				})
			end,
		},
		{
			";f",
			function()
				local builtin = require("telescope.builtin")
				builtin.find_files({
					no_ignore = false,
					hidden = true,
				})
			end,
		},
		{
			"sf",
			function()
				local telescope = require("telescope")

				local function telescope_buffer_dir()
					return vim.fn.expand("%:p:h")
				end

				telescope.extensions.file_browser.file_browser({
					path = "%:p:h",
					cwd = telescope_buffer_dir(),
					respect_gitignore = false,
					hidden = true,
					grouped = true,
					previewer = false,
					initial_mode = "normal",
					layout_config = { height = 40 },
				})
			end,
		},
	},
	config = function(_, opts)
		local telescope = require("telescope")
		local actions = require("telescope.actions")
		local fb_actions = require("telescope").extensions.file_browser.actions

		opts.defaults = vim.tbl_deep_extend("force", opts.defaults, {
			wrap_results = true,
			layout_strategy = "horizontal",
			layout_config = { prompt_position = "top" },
			sorting_strategy = "ascending",
			winblend = 0,
			mappings = {},
		})
		opts.pickers = {
			diagnostics = {
				theme = "ivy",
				initial_mode = "normal",
				layout_config = {
					preview_cutoff = 9999,
				},
			},
		}
		opts.extensions = {
			aerial = {
				-- Display symbols as <root>.<parent>.<symbol>
				show_nesting = {
					["_"] = false, -- This key will be the default
					json = true, -- You can set the option for specific filetypes
					yaml = true,
				},
			},
			file_browser = {
				theme = "dropdown",
				-- disables netrw and use telescope-file-browser in its place
				hijack_netrw = true,
				mappings = {
					-- your custom insert mode mappings
					["n"] = {
						-- your custom normal mode mappings
						["N"] = fb_actions.create,
						["h"] = fb_actions.goto_parent_dir,
						["/"] = function()
							vim.cmd("startinsert")
						end,
						["<C-u>"] = function(prompt_bufnr)
							for _ = 1, 10 do
								actions.move_selection_previous(prompt_bufnr)
							end
						end,
						["<C-d>"] = function(prompt_bufnr)
							for _ = 1, 10 do
								actions.move_selection_next(prompt_bufnr)
							end
						end,
						["<PageUp>"] = actions.preview_scrolling_up,
						["<PageDown>"] = actions.preview_scrolling_down,
					},
				},
			},
		}
		telescope.setup(opts)
		require("telescope").load_extension("fzf")
		require("telescope").load_extension("file_browser")
	end,
}
```

### noice

noice 的部分一樣把惱人的 `No information available` 給禁掉

```lua
{
	"folke/noice.nvim",
	opts = function(_, opts)
		table.insert(opts.routes, {
			filter = {
				event = "notify",
				find = "No information available",
			},
			opts = {
				skip = true,
			},
		})

		opts.presets.lsp_doc_border = true
	end,
}
```

### incline

incline 是一個方便顯示不同分割畫面中檔案名稱的 plugins
這樣在一個畫面中有不同檔案時可以比較容易看到檔案名稱，不用將游標移動到那一個分割區

這邊改了一下顏色的設定，同時將如果游標停在第一行時會隱藏檔名

```lua
{
	"b0o/incline.nvim",
	dependencies = { "craftzdog/solarized-osaka.nvim" },
	event = "BufReadPre",
	priority = 1200,
	config = function()
		local colors = require("solarized-osaka.colors").setup()
		require("incline").setup({
			highlight = {
				groups = {
					InclineNormal = { guibg = colors.magenta500, guifg = colors.base04 },
					InclineNormalNC = { guifg = colors.violet500, guibg = colors.base03 },
				},
			},
			window = { margin = { vertical = 0, horizontal = 1 } },
			hide = {
				cursorline = true,
			},
			render = function(props)
				local filename = vim.fn.fnamemodify(vim.api.nvim_buf_get_name(props.buf), ":t")
				if vim.bo[props.buf].modified then
					filename = "[+] " .. filename
				end

				local icon, color = require("nvim-web-devicons").get_icon_color(filename)
				return { { icon, guifg = color }, { " " }, { filename } }
			end,
		})
	end,
}
```

### bufferline

bufferline 是將 buffer 中的分頁顯示類似 VSCode 這些 IDE 的樣子，這邊也是簡單的設定一下
因為不喜歡關閉檔案的 icon，所以把他們都關掉了

```lua
{
    "akinsho/bufferline.nvim",
    keys = {
        { "<Tab>", "<Cmd>BufferLineCycleNext<CR>" },
        { "<S_Tab>", "<Cmd>BufferLineCyclePrev<CR>" },
    },
    opts = {
        options = {
            mode = "tabs",
            show_buffer_close_icons = false,
            show_close_icon = false,
        },
    },
}
```

### lualine

lualine 是一個讓狀態列更好看的 plugin，LazyVim 預設就有了
我多加了一項顯示 LSP 的功能，其餘基本上是直接搬 LazyVim 的預設

```lua
{
	"nvim-lualine/lualine.nvim",
	event = "VeryLazy",
	dependencies = {
		"craftzdog/solarized-osaka.nvim",
		"nvim-tree/nvim-web-devicons",
	},

	init = function()
		vim.g.lualine_laststatus = vim.o.laststatus
		if vim.fn.argc(-1) > 0 then
			-- set an empty statusline till lualine loads
			vim.o.statusline = " "
		else
			-- hide the statusline on the starter page
			vim.o.laststatus = 0
		end
	end,
	opts = function()
		-- PERF: we don't need this lualine require madness 🤷
		local lualine_require = require("lualine_require")
		lualine_require.require = require

		local icons = LazyVim.config.icons
		local lsp = {
			function()
				local msg = "No Active Lsp"
				local buf_ft = vim.api.nvim_buf_get_option(0, "filetype")
				local clients = vim.lsp.get_active_clients()
				if next(clients) == nil then
					return msg
				end
				for _, client in ipairs(clients) do
					local filetypes = client.config.filetypes
					if filetypes and vim.fn.index(filetypes, buf_ft) ~= -1 then
						return client.name
					end
				end
				return msg
			end,
			icon = " ",
		}

		vim.o.laststatus = vim.g.lualine_laststatus

		local opts = {
			options = {
				section_separators = "",
				component_separators = "│",
				theme = "auto",
				globalstatus = vim.o.laststatus == 3,
				disabled_filetypes = { statusline = { "dashboard", "alpha", "ministarter" } },
			},
			sections = {
				lualine_a = { "mode" },
				lualine_b = { "branch" },
				lualine_c = { { "diff", "diagnostics" }, "filename", "aerial" },
				lualine_x = { lsp, "filetype" },
				lualine_y = { "location", "progress" },
				lualine_z = { "encoding", "filesize" },
			},

			extensions = { "neo-tree", "lazy" },
		}

		-- do not add trouble symbols if aerial is enabled
		-- And allow it to be overriden for some buffer types (see autocmds)
		if vim.g.trouble_lualine and LazyVim.has("trouble.nvim") then
			local trouble = require("trouble")
			local symbols = trouble.statusline({
				mode = "symbols",
				groups = {},
				title = false,
				filter = { range = true },
				format = "{kind_icon}{symbol.name:Normal}",
				hl_group = "lualine_c_normal",
			})
			table.insert(opts.sections.lualine_c, {
				symbols and symbols.get,
				cond = function()
					return vim.b.trouble_lualine ~= false and symbols.has()
				end,
			})
		end

		return opts
	end,
}
```

### dashboard

最後關於 UI 的設定是 dashboard，預設是顯示一個 LazyVim 的 ASCII art
這邊我改成用自己的 username，可以到 [這個網站](https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20) 做一個自己的 ASCII art

另外因為現在看電腦的時間越來越長，如果字體維持 14 號字開始會眼花了
為了因應將字體調整到 16 號、我的 dashboard 在 13 吋的筆電螢幕上看起來有點擠（最後面幾個選項會超出螢幕），將開頭的行數減少了

```lua
return {
    {
        "nvimdev/dashboard-nvim",
        event = "VimEnter",
        opts = function(_, opts)
            local logo = [[
███╗   ███╗██╗ ██████╗ ██╗  ██╗██╗████████╗ ██████╗
████╗ ████║██║██╔═══██╗██║  ██║██║╚══██╔══╝██╔═══██╗
██╔████╔██║██║██║   ██║███████║██║   ██║   ██║   ██║
██║╚██╔╝██║██║██║   ██║██╔══██║██║   ██║   ██║   ██║
██║ ╚═╝ ██║██║╚██████╔╝██║  ██║██║   ██║   ╚██████╔╝
╚═╝     ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝    ╚═════╝

██╗  ██╗██╗██████╗ ██╗███████╗██╗  ██╗███████╗██╗  ██╗
██║ ██╔╝██║██╔══██╗██║██╔════╝██║  ██║╚════██║██║  ██║
█████╔╝ ██║██████╔╝██║███████╗███████║    ██╔╝███████║
██╔═██╗ ██║██╔══██╗██║╚════██║╚════██║   ██╔╝ ╚════██║
██║  ██╗██║██║  ██║██║███████║     ██║   ██║       ██║
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝╚══════╝     ╚═╝   ╚═╝       ╚═╝
            ]]

            logo = string.rep("\n", 2) .. logo .. string.rep("\n", 2)
            opts.config.header = vim.split(logo, "\n")
        end,
    },
}
```

### treesitter

treesitter 是一個 highlighting 用的插件，支援多種語言，讓程式碼便的更好讀
這邊加入了幾個我比較常用的語言，確保他們都有安裝

```lua
{
	"nvim-treesitter/nvim-treesitter",
	opts = {
		ensure_installed = {
			"javascript",
			"typescript",
			"graphql",
			"http",
			"astro",
			"cmake",
			"c",
			"cpp",
			"css",
			"json",
			"gitignore",
			"vim",
			"go",
			"graphql",
			"http",
			"java",
			"php",
			"rust",
			"scss",
			"sql",
			"svelte",
			"fish",
			"lua",
			"python",
		},
		query_linter = {
			enable = true,
			use_virtual_text = true,
			lint_events = { "BufWrite", "CursorHold" },
		},
	},
	confirg = function(_, opts)
		require("nvim-treesitter.configs").setup(opts)

		vim.filetype.add({
			extension = {
				mdx = "mdx",
			},
		})
		vim.treesitter.language.register("markdown", "mdx")
	end,
}
```

### aerial

Aerial 是另一個 tagbar，改成用 aerial 的的原因是他有對 telescope 的支援，如果要以內容搜尋會更準確

```lua
{
	"stevearc/aerial.nvim",
	opts = {},
	-- Optional dependencies
	dependencies = {
		"nvim-treesitter/nvim-treesitter",
		"nvim-tree/nvim-web-devicons",
	},
	keys = {
		{
			"<leader>z",
			"<cmd>AerialToggle!<Cr>",
		},
	},
	config = function()
		local aerial = require("aerial")
		aerial.setup({
			on_attach = function(bufnr)
				vim.keymap.set("n", "{", "<cmd>AerialPrev<CR>", { buffer = bufnr })
				vim.keymap.set("n", "}", "<cmd>AerialNext<CR>", { buffer = bufnr })
			end,
			layout = {
				width = 30,
			},
		})
	end,
}
```

### vim-tmux-navigator

在各個分割畫面中，可以用 Ctrl + [h, j, k, l] 來做切換對應位置的畫面
另外我平常的開發環境習慣用 tmux 來管理各種工作，如果可以直跟用相同的快捷鍵切換再好不過了，不然兩個的 prefix 不同很容易按錯

```lua
return {
    "christoomey/vim-tmux-navigator",
    cmd = {
        "TmuxNavigateLeft",
        "TmuxNavigateDown",
        "TmuxNavigateUp",
        "TmuxNavigateRight","TmuxNavigatePrevious",
    },
    keys = {
        { "<c-h>", "<cmd><C-U>TmuxNavigateLeft<cr>" },
        { "<c-j>", "<cmd><C-U>TmuxNavigateDown<cr>" },
        { "<c-k>", "<cmd><C-U>TmuxNavigateUp<cr>" },
        { "<c-l>", "<cmd><C-U>TmuxNavigateRight<cr>" },
        { "<c-\\>", "<cmd><C-U>TmuxNavigatePrevious<cr>" },
    },
}
```

另外要注意一下，在 tmux 那邊也記得要安裝這個套件

### template

最後的最後是 tamplete，因為我目前寫 C++ 幾乎都還是要寫競程的內容，有個 default code 會舒服一些，也比較符合我之前寫競賽 code 的習慣
因此這邊用 new-file-template 來完成這件事
其本身的 config 是沒有 lazy load 的，因為我並不是無時無刻都要寫新 code，甚至現在有很多時間都不是在寫 C++，因此加上 lazy load
目前用起來沒有什麼大問題，不過 default 沒辦法加上 `#define endl '\n'` 有點討厭，因為 `\n` 會被 lua 視為換行，改成用 `\\n` 也是有一樣的問題

以後要習慣敲 `'\n'` 而不是 `endl` 了 QAQ

```lua
return {
    {
        "otavioschwanck/new-file-template.nvim",
        lazy = true,
        opts = {},
        event = "BufNewFile",
    },
}
```

### nvim-silicon

截圖用插件，在極少的時候想要展示自己的程式碼 render 出來長怎樣就會用這個截圖

```lua
{
	"michaelrommel/nvim-silicon",
	lazy = true,
	cmd = "Silicon",
	config = function()
		require("silicon").setup({
			-- Configuration here, or leave empty to use defaults
			font = "SauceCodePro Nerd Font=34;SauceCOdePro Nerd Font=34",
			to_clipboard = true,
			theme = "Solarized (dark)",
			background = "#0d90b2",
			output = function()
				return "~/Desktop/" .. os.date("!%Y-%m-%dT%H-%M-%S") .. "_code.png"
			end,
		})
	end,
}
```

### inc-rename

inc-rename 是一個好用的重新命名插件
最強大的功能，就是能在同一個專案中將同樣名稱的函數/套件名稱/全域變數一起重新命名

```lua
{
	"smjonas/inc-rename.nvim",
	cmd = "IncRename",
	keys = {
		{
			"<leader>n",
			function()
				return ":IncRename " .. vim.fn.expand("<cword>")
			end,
			desc = "Incremental rename",
			mode = "n",
			noremap = true,
			expr = true,
		},
	},
	config = true,
}
```

### refactoring

refactoring 也是一個重新命名的插件，不過他重新命名的樣式不太一樣，是可以將某個片段的程式碼擷取起來額外定義成一個函數
開發的時候很好用，像是想要將某個段落的程式碼重新利用的時候，就可以用這個插件將這段程式碼函數化

```lua
{
	"ThePrimeagen/refactoring.nvim",
	keys = {
		{
			"<leader>r",
			function()
				require("refactoring").select_refactor({
					show_success_message = true,
				})
			end,
			mode = "v",
			noremap = true,
			silent = true,
			expr = false,
		},
	},
	opts = {},
}
```

### snacks

snacks 同樣是 folke 大神寫的插件，有點類似 mini.nvim，可以開一個新的視窗顯示部分資訊

```lua
{
	"folke/snacks.nvim",
	priority = 1000,
	lazy = false,
	---@type snacks.Config
	opts = {
		bigfile = { enabled = true },
		notifier = {
			enabled = true,
			timeout = 3000,
		},
		quickfile = { enabled = true },
		statuscolumn = { enabled = true },
		words = { enabled = true },
		styles = {
			notification = {
				wo = { wrap = true }, -- Wrap notifications
			},
		},
	},
	keys = {
		{
			"<leader>gg",
			function()
				Snacks.lazygit()
			end,
			desc = "Lazygit",
		},
		{
			"<leader>gb",
			function()
				Snacks.git.blame_line()
			end,
			desc = "Git Blame Line",
		},
		{
			"<leader>gf",
			function()
				Snacks.lazygit.log_file()
			end,
			desc = "Lazygit Current File History",
		},
		{
			"<leader>gl",
			function()
				Snacks.lazygit.log()
			end,
			desc = "Lazygit Log (cwd)",
		},
		{
			"<c-_>",
			function()
				Snacks.terminal()
			end,
			desc = "Toggle Terminal",
		},
		{
			"<leader>mk",
			function()
				Snacks.win({
					file = "./makefile",
					width = 0.8,
					height = 0.8,
					wo = {
						spell = false,
						wrap = false,
						signcolumn = "yes",
						statuscolumn = " ",
						conceallevel = 3,
					},
				})
			end,
			desc = "Open makefile",
		},
	},
	init = function()
		vim.api.nvim_create_autocmd("User", {
			pattern = "VeryLazy",
			callback = function()
				-- Setup some globals for debugging (lazy-loaded)
				_G.dd = function(...)
					Snacks.debug.inspect(...)
				end
				_G.bt = function()
					Snacks.debug.backtrace()
				end
				vim.print = _G.dd -- Override print to use snacks for `:=` command
			end,
		})
	end,
}
```

### tide

tide 可以標記部分檔案以供快速跳到該檔案
像是我在改 [Guildmages' Forum](https://guildmagesforum.tw/) 的主題時，有很多檔案散落在各個位置，用腦子根本記不起來他們放在哪
這時有 tide 就很方便，可以將目前會用到的各個檔案集中在一起

```lua
{
	"jackMort/tide.nvim",
	requires = {
		"MunifTanjim/nui.nvim",
		"nvim-tree/nvim-web-devicons",
	},
	config = function()
		require("tide").setup({
			keys = {
				leader = ";", -- Leader key to prefix all Tide commands
				panel = ";", -- Open the panel (uses leader key as prefix)
				add_item = "a", -- Add a new item to the list (leader + 'a')
				delete = "d", -- Remove an item from the list (leader + 'd')
				clear_all = "x", -- Clear all items (leader + 'x')
				horizontal = "-", -- Split window horizontally (leader + '-')
				vertical = "|", -- Split window vertically (leader + '|')
			},
			animation_duration = 0, -- Animation duration in milliseconds
			animation_fps = 60, -- Frames per second for animations
			hints = {
				dictionary = "qwertzuiopsfghjklycvbnm", -- Key hints for quick access
			},
		})
	end,
}
```

### vim-test

有時在開發一些 project 時，用 vim-test 不用切到 shell 便可以快速的做測試

```lua
{
	"vim-test/vim-test",
	dependencies = {
		"preservim/vimux",
	},
	keys = {
		{ "<leader>t", ":TestNearest<CR>" },
		{ "<leader>T", ":TestFile<CR>" },
		{ "<leader>a", ":TestSuite<CR>:" },
		{ "<leader>L", ":TestLast<CR>" },
		{ "<leader>g", "::TestVisit<CR>" },
	},
	config = function()
		vim.cmd("let test#strategy = 'vimux'")
	end,
}
```

### Yazi

Yazi 是一個 CLI 下的 Finder，他的作者也有寫一個 NeoVim 內插的套件

```lua
---@type LazySpec
{
    "mikavilpas/yazi.nvim",
    event = "VeryLazy",
    keys = {
        {
            "<leader>yy",
            "<cmd>Yazi<cr>",
            desc = "Open yazi at the current file",
        },
        {
            -- Open in the current working directory
            "<leader>cw",
            "<cmd>Yazi cwd<cr>",
            desc = "Open the file manager in nvim's working directory",
        },
    },
    ---@type YaziConfig
    opts = {
        -- if you want to open yazi instead of netrw, see below for more info
        open_for_directories = false,
        keymaps = {
            show_help = "<f1>",
        },
    },
}
```

## Zsh

之前在 zsh 我都是無腦的用 powerlever10k，不過他們在今年年中的時候宣布不會再繼續開發，只會針對安全性漏洞進行修復
雖然有沒有繼續開發對我來說沒有什麼差，不過這個類似的 shell 我已經看了好幾年了（從 p9k 用到現在，應該至少七八年了吧
所以想說趁這個機會換另一個 shell theme 看看

最後選定用 oh my posh 而不是 starship，主要原因是 oh my posh 有更多 starship 還沒支援的功能
而且 oh my posh 的啟動速度一樣很快，至少跟 starship 比起來感覺不出來差別

另外這個 setup 極度簡單，一共分成兩行
第一行是以目前目錄位置作為開頭，如果有 git 的話後面會顯示 git status，並在行尾顯示前一個 command 的 return status 和 run time
第二行就是簡單的指令輸入，開頭的 nerd font 會隨著前一個 command 的 return status 變成不同的顏色

```toml
console_title_template = ' {{ .Folder }} {{if .Root}} :: Admin{{end}}'
version = 3
final_space = true

[[blocks]]
type = 'prompt'
alignment = 'left'
newline = true

[[blocks.segments]]
foreground = 'magenta'
type = 'path'
style = 'plain'
template = '{{.Path}} '

[blocks.segments.properties]
style = 'full'

[[blocks.segments]]
type = 'git'
style = 'plain'
template = '<#5c6d74>on</> <green>{{.HEAD}}{{if (gt .Behind 0)}} 󰜮{{.Behind}}{{end}}{{if (gt .Ahead 0)}} 󰜷{{.Ahead}}{{end}}</><magenta>{{if .Working.Added}} +{{.Working.Added}}{{end}}</><p:light-sky-blue>{{if .Working.Modified}} ~{{.Working.Modified}}{{end}}</><yellow>{{if .Working.Untracked}} !{{.Working.Untracked}}{{end}}</><red>{{if .Working.Deleted}} -{{.Working.Deleted}}{{end}}</>'

[blocks.segments.properties]
fetch_status = true
fetch_upstream_icon = true
source = "cli"

[[blocks]]
type = 'prompt'
alignment = 'right'
overflow = 'hidden'

[[blocks.segments]]
type = 'executiontime'
style = 'powerline'
foreground = '#5c6d74'
template = 'took {{.FormattedMs}}'

[blocks.segments.properties]
threshold = 500
style = 'austin'

[[blocks.segments]]
template = ' '
foreground = 'red'
type = 'status'
style = 'plain'

[[blocks]]
type = 'prompt'
alignment = 'left'
newline = true

[[blocks.segments]]
type = 'text'
style = 'plain'
background = 'transparent'
foreground_templates = [
    '{{if gt .Code 0}}red{{end}}',
    '{{if eq .Code 0}}cyan{{end}}',
]
template = "❯"

[secondary_prompt]
background = 'transparent'
foreground = 'cyan'
template = '❯❯'
```

## Tmux

tmux 是我這次改動最多的地方，一直以來我都是用 themepack 裡面的 cyan，雖然有做一點修改不過大致上都還是沿用預設的 config
不過既然 zsh 都改成那麼簡單的風格了，也想要換一個新的 theme
後來看上了 [janoamaral/tokyo-night-tmux](https://github.com/janoamaral/tokyo-night-tmux)，適用了一陣子很喜歡，只差 color scheme 不是我常用的 solarized-osaka，其他一切都完美了
於是最後我決定要 fork 下來自己修改，最後變成了 [MiohitoKiri5474/solarized-osaka-tmux](https://github.com/MiohitoKiri5474/solarized-osaka-tmux)
不過主要改動也只是改了 color scheme 還有把所有 `tokyo-night-tmux` prefix 的設定全部改成 `solarized-osaka-tmux` 而已
另外也重新設計了 tmux 的 status line，還有把惱人的 web-git-support 給拔了

```sh
#!/usr/bin/env bash

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPTS_PATH="$CURRENT_DIR/src"

source $SCRIPTS_PATH/themes.sh

tmux set -g status-left-length 80
tmux set -g status-right-length 150

RESET="#[fg=${THEME[foreground]},bg=${THEME[black]},nobold,noitalics,nounderscore,nodim]"
# Highlight colors
tmux set -g mode-style "fg=${THEME[bgreen]},bg=${THEME[bblack]}"

tmux set -g message-style "bg=${THEME[blue]},fg=${THEME[background]}"
tmux set -g message-command-style "fg=${THEME[white]},bg=${THEME[black]}"

tmux set -g pane-border-style "fg=${THEME[bblack]}"
tmux set -g pane-active-border-style "fg=${THEME[bblack]}"
tmux set -g pane-border-status off

tmux set -g status-style bg="${THEME[black]}"

TMUX_VARS="$(tmux show -g)"

default_window_id_style="digital"
default_pane_id_style="hsquare"
default_zoom_id_style="dsquare"

window_id_style="$(echo "$TMUX_VARS" | grep '@solarized-osaka-tmux_window_id_style' | cut -d" " -f2)"
pane_id_style="$(echo "$TMUX_VARS" | grep '@solarized-osaka-tmux_pane_id_style' | cut -d" " -f2)"
zoom_id_style="$(echo "$TMUX_VARS" | grep '@solarized-osaka-tmux_zoom_id_style' | cut -d" " -f2)"
window_id_style="${window_id_style:-$default_window_id_style}"
pane_id_style="${pane_id_style:-$default_pane_id_style}"
zoom_id_style="${zoom_id_style:-$default_zoom_id_style}"

netspeed="#($SCRIPTS_PATH/netspeed.sh)"
cmus_status="#($SCRIPTS_PATH/music-tmux-statusbar.sh)"
git_status="#($SCRIPTS_PATH/git-status.sh #{pane_current_path})"
wb_git_status="#($SCRIPTS_PATH/wb-git-status.sh #{pane_current_path} &)"
window_number="#($SCRIPTS_PATH/custom-number.sh #I $window_id_style)"
custom_pane="#($SCRIPTS_PATH/custom-number.sh #P $pane_id_style)"
zoom_number="#($SCRIPTS_PATH/custom-number.sh #P $zoom_id_style)"
date_and_time="$($SCRIPTS_PATH/datetime-widget.sh)"
current_path="#($SCRIPTS_PATH/path-widget.sh #{pane_current_path})"
battery_status="#($SCRIPTS_PATH/battery-widget.sh)"

#+--- Bars LEFT ---+
# Session name
tmux set -g status-left "#[fg=${THEME[bblack]},bg=${THEME[bmagenta]},bold] #{?client_prefix,󰠠 ,#[dim]󰤂 }${RESET}#[fg=${THEME[bblack]},bg=${THEME[bmagenta]}]#(whoami) "

#+--- Windows ---+
# Focus
tmux set -g window-status-current-format "${RESET}#[bg=${THEME[white]}] #[fg=${THEME[magenta]},bold,nodim]$window_number #W#[nobold]#{?window_zoomed_flag, $zoom_number, $custom_pane}"
# Unfocused
tmux set -g window-status-format "${RESET}#{?window_last_flag, #[fg=${THEME[yellow]}], }$window_number #W#[nobold,dim]#{?window_zoomed_flag, $zoom_number, $custom_pane}"

#+--- Bars RIGHT ---+
tmux set -g status-right "$battery_status$current_path$cmus_status$netspeed$git_status$date_and_time #[fg=${THEME[black]},bg=${THEME[magenta]}] #H"
tmux set -g window-status-separator ""
```

## Epilogue

跟往常一樣，只要我開始蓋 config 基本上就是在裝忙（逃避作業的部分）加上改了一點小東西之後改上頭了停不下來
這次的設定也算是近期內做的最大改動，之前在怎麼說也都沒有動到 tmux 跟 zsh，一直以來我都認為這兩個東西只要能用能看就好
直到這次開始改東西後才發現以前的 setup 好像沒有那麼適合我，現在的樣子才是我看起來最舒服的

另外之前說不知道會不會寫破 1000 行的文章，現在不就破了嗎XD
目前編輯器顯示這一行是第 1157 行，雖然有大半都是 config 不過應該還是能算達標了吧（？
