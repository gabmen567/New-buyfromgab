# Ubuntu heading fonts

Ubuntu Regular (400), Medium (500), and Bold (700) are self-hosted for titles through the shared typography.css. Body text keeps the existing storefront and admin font stacks. The unfinished Rapor setup has been removed.

Original font binaries are from Google Fonts' official CDN:
- https://fonts.gstatic.com/s/ubuntu/v21/4iCs6KVjbNBYlgo6eA.ttf
- https://fonts.gstatic.com/s/ubuntu/v21/4iCv6KVjbNBYlgoCjC3Ttw.ttf
- https://fonts.gstatic.com/s/ubuntu/v21/4iCv6KVjbNBYlgoCxCvTtw.ttf

Ubuntu is distributed under the Ubuntu Font Licence, included in UFL.txt. The licence is from https://github.com/google/fonts/blob/main/ufl/ubuntu/UFL.txt.

The build explicitly copies these three fonts and their licence. Font URLs are relative to the shared stylesheet, so storefront and admin pages use the same files.
